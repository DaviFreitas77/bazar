<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Http\Services\ColorService;
use App\Http\Services\OrderService;
use App\Http\Services\ShoppingCartService;
use App\Http\Services\SizeService;
use App\Jobs\SendNewOrderEmailToAdminJob;
use App\Jobs\SendOrderCreatedEmailJob;
use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;



class McphookController extends Controller
{

    public function __construct(private OrderService $orderService, private ShoppingCartService $shoppingCartService, private ColorService $colorService, private SizeService $sizeService)
    {
        $this->orderService = $orderService;
        $this->shoppingCartService = $shoppingCartService;
        $this->colorService = $colorService;
        $this->sizeService = $sizeService;
    }
    public function __invoke(Request $request)
    {

        $paymentId = $request->data['id'] ?? null;

        if ($paymentId) {
            $response = Http::get("https://api.mercadopago.com/v1/payments/{$paymentId}", [
                'access_token' => env('MERCADO_PAGO_ACCESS_TOKEN'),
            ]);

            $data = $response->json();


            $order = Order::with('user')->find($data['external_reference']);

            Log::info($order);

            if ($order) {
                $user = $order->user;
                $orderItems = OrderItems::with('product.images')
                    ->where('fk_order', $order->id)
                    ->get();

                $productsData = $orderItems->map(function ($item) {
                    $firstImage = $item->product->images->first();
                    return [
                        'name'     => $item->product->name,
                        'price'    => $item->product->price,
                        'color'    => $this->colorService->getColorById($item->fk_color),
                        'size'     => $this->sizeService->getSizeById($item->fk_size),
                        'quantity' => $item->quantity,
                        'image'    => $firstImage ? $firstImage->image : null
                    ];
                })->toArray();


                switch ($data['status']) {
                    case 'approved':

                        $this->orderService->changeOrderStatus('preparando', $order->id);

                        $this->orderService->updatePaymentOrderService($data['payment_type_id'], $order->id, $user->id);

                        $this->shoppingCartService->deleteCartUser($user->id);

                        // Disparar os Jobs
                        SendOrderCreatedEmailJob::dispatch(
                            $user->email,
                            $user->name,
                            $order->number_order,
                            $productsData,
                            $data['payment_type_id'],
                            $data['transaction_amount']
                        );

                        SendNewOrderEmailToAdminJob::dispatch(
                            $user->name,
                            $order->number_order,
                            $productsData,
                            $user->tel
                        );
                        break;

                    case 'pending':
                        $this->orderService->changeOrderStatus('pending', $data['external_reference']);
                        break;
                    case 'rejected':
                        $this->orderService->changeOrderStatus('canceled', $data['external_reference']);
                        break;

                    case 'refunded':
                        $this->orderService->changeOrderStatus('refunded', $data['external_reference']);
                        break;

                    default:
                        Log::warning("Payment {$paymentId}  {$data['status']}.");
                }
            }
        }
        return response()->json(['status' => 'success'], 200);
    }
}