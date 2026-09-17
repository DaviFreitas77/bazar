<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Http\Services\ColorService;
use App\Http\Services\OrderService;
use App\Http\Services\ProductService;
use App\Http\Services\ShoppingCartService;
use App\Http\Services\SizeService;
use App\Jobs\SendNewOrderEmailToAdminJob;
use App\Jobs\SendOrderCreatedEmailJob;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Events\UpdateOrderStatus;
use App\Jobs\ProcessPaymentJob;

class McphookController extends Controller
{

    public function __construct(private OrderService $orderService, private ShoppingCartService $shoppingCartService, private ColorService $colorService, private SizeService $sizeService, private ProductService $productService)
    {
        $this->orderService = $orderService;
        $this->shoppingCartService = $shoppingCartService;
        $this->colorService = $colorService;
        $this->sizeService = $sizeService;
        $this->productService = $productService;
    }
    public function __invoke(Request $request)
    {

        $paymentId = $request->input('data.id');

        Log::info('Webhook recebido', [
            'payment_id' => $paymentId,
            'payload' => $request->all()
        ]);

        if (!$paymentId) {
            Log::warning('Webhook sem payment id', [
                'payload' => $request->all()
            ]);

            return response()->json(['status' => 'ignored'], 200);
        }

        Log::info('paymentID', ['id' => $paymentId]);


        ProcessPaymentJob::dispatch($paymentId);

        return response()->json(['status' => 'success'], 200);
    }
}
