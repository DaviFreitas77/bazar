<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Services\DeliveryService;
use App\Http\Services\MCPService;
use App\Http\Services\OrderItemsService;
use App\Http\Services\OrderService;
use App\Http\Services\ProductService;
use App\Http\Services\ShoppingCartService;
use App\Jobs\CancelOrderJob;
use App\Models\Logradouro;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Response;


#[Group('Order')]
class CreateOrderController extends Controller
{
    /**
     * Create new order
     */

    public function __construct(private ProductService $productService, private OrderService $orderService, private OrderItemsService $orderItemsService, private MCPService $mcpService, private ShoppingCartService $shoppingCartService, private DeliveryService $deliveryService)
    {
        $this->productService = $productService;
        $this->orderService = $orderService;
        $this->orderItemsService = $orderItemsService;
        $this->mcpService = $mcpService;
        $this->shoppingCartService = $shoppingCartService;
        $this->deliveryService = $deliveryService;
    }

    public function __invoke(StoreOrderRequest $request)
    {
        $data = $request->validated();

        if (empty($data['freight'])) {

            $zip_code = Logradouro::find($data['idLogradouro'])->zip_code;

            $freightPrice = $data['freight']['price'];
            $freightCompany = $data['freight']['company'];
            $freightName = $data['freight']['name'];

            $products = array_map(function ($item) {
                return [
                    'id' => $item['id'],
                    'quantity' => $item['quantity']
                ];
            }, $data['items']);

            $freightResponse = $this->deliveryService->CalcFreight([
                "to" => [
                    'postal_code' => $zip_code
                ],
                "products" => $products,
            ]);

            $freight = $freightResponse->getData(true);

            $validFreight = false;

            foreach ($freight as $service) {

                if (
                    $service['company']['name'] === $freightCompany &&
                    $service['name'] === $freightName &&
                    $service['price'] === $freightPrice
                ) {
                    $validFreight = true;
                    break;
                }
            }

            if (!$validFreight) {
                return response()->json([
                    'message' => 'Frete alterado'
                ], 422);
            }
        }



        $adressId = $data['idLogradouro'] ?? null;

        if (empty($adressId) || !is_numeric($adressId)) {
            $adressId = null;
        }
        $userId = $request->user()->id;


        $sumPrice = $this->productService->fethPricesProduct($data['items']);

        if($validFreight){
            $sumPrice = $sumPrice + $data['freight']['price'];
        }

        $newOder = $this->orderService->create($userId, 'pending', $sumPrice, $adressId, $data['freight']['name'], $data['freight']['company'], $data['freight']['price']);

        $this->orderItemsService->create($data['items'], $newOder->id);

        $preference = $this->mcpService->createPreferenceService($data['items'], $sumPrice, $newOder->id);

        CancelOrderJob::dispatch($newOder->id)->delay(now()->addMinutes(15));
        $this->shoppingCartService->deleteCartUser($userId);


        return response()->json([
            "total" => $preference['total'],
            "orderId" => $preference['orderId'],
            "created_at" => $newOder->created_at,
            "preference" => $preference
        ], Response::HTTP_CREATED);
    }
}
