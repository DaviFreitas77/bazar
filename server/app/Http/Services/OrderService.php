<?php

namespace App\Http\Services;

use App\Models\Logradouro;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class OrderService
{

    public function create(
        int $idUser,
        string $status = 'pending',
        float $total = 0,
        ?int $idAdress = null,
        ?string $nameFreight = null,
        ?string $companyFreight = null,
        float $priceFreight = 0
    ) {
        $newOrder = new Order;
        $newOrder->number_order = rand(10000, 99999);
        $newOrder->fk_user = $idUser;
        $newOrder->status = $status;
        $newOrder->payment_method = null;
        $newOrder->total = $total;
        $newOrder->fk_adress = $idAdress;
        $newOrder->name_freight = $nameFreight;
        $newOrder->company_freight = $companyFreight;
        $newOrder->price_freight = $priceFreight;
        $newOrder->created_at = now();
        $newOrder->save();
        return $newOrder;
    }

    public function changeOrderStatus($status, $idOrder)
    {
        $order = Order::find($idOrder);
        $order->status = $status;
        $order->save();
        return $order;
    }


    public function updatePaymentOrderService($method, $idOrder, $userId)
    {
        $order = Order::where('fk_user', $userId)->where('id', $idOrder)->first();
        if ($order->payment_method == null) {
            $order->payment_method = $method;
            $order->save();
        }
        return $order;
    }



    public function fetchLatestOrder(User $user)
    {
        $idUser = $user['id'];
        $orders = Order::where('fk_user', $idUser)->latest()->first();
        return $orders;
    }

    public function fetchOrderUser($idUser)
    {

        $orderUser =  Order::where('fk_user', $idUser)->get();

        $orderComplet = [];
        foreach ($orderUser as $order) {
            $orderItems = OrderItems::with('product.images', 'color', 'size')
                ->where('fk_order', $order->id)
                ->get();


            $infoproducts = $orderItems->map(function ($item) {
                return ['nameProduct' => $item->product->name, 'quantityProduct' => $item->quantity, 'imageProduct' => $item->product->images->first()->image, 'colorProduct' => $item->color->hexadecimal, 'sizeProduct' => $item->size->name];
            });

            $orderComplet[] = [
                'numberOrder'    => $order->number_order,
                'status'         => $order->status,
                'total'          => $order->total,
                'payment_method' => $order->payment_method,
                'created_at'     => $order->created_at,
                'items'          => $infoproducts,
                'pix_code'        => $order->pix_code,
                'pix_qr_code_base64' => $order->pix_qr_code_base64
            ];
        }

        return response()->json($orderComplet);
    }

    public function fetchItemsOrder($idOrder)
    {

        $orderById =  Order::where('id', $idOrder)->first();

        if (!$orderById) {
            return [];
        }


        $getLogradouro = Logradouro::find($orderById->fk_adress);


        $orderComplet = [];

        $orderItems = OrderItems::with('product.images', 'color', 'size')
            ->where('fk_order', $idOrder)
            ->get();


        $infoproducts = $orderItems->map(function ($item) {
            return [
                'nameProduct' => $item->product->name,
                'quantityProduct' => $item->quantity,
                'imageProduct' => $item->product->images->first()->image,
                'colorProduct' => $item->color->name,
                'sizeProduct' => $item->size->name,
                'price' => $item->product->price
            ];
        });

        $orderComplet[] = [
            'numberOrder'    => $orderById->number_order,
            'status'         => $orderById->status,
            'total'          => $orderById->total,
            'payment_method' => $orderById->payment_method,
            'name_freight' => $orderById->name_freight,
            'company_freight' => $orderById->company_freight,
            'price_freight' => $orderById->price_freight,
            'created_at'     => $orderById->created_at,
            'items'          => $infoproducts,
            'logradouro' => $getLogradouro ?? null
        ];


        return $orderComplet;
    }

    public function orderById($orderId)
    {
        $order = Order::find($orderId);
        return $order;
    }

    public function cancelOrder($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Pedido não encontrado'
            ], 404);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Este pedido não pode ser cancelado'
            ], 400);
        }

        $order->status = 'canceled';
        $order->save();

        return response()->json([
            'message' => 'Pedido cancelado com sucesso'
        ]);
    }

    public function fetchAllOrders()
    {
        $orders = Order::all();
        return $orders;
    }
}
