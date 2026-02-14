<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Services\OrderService;


class ListItemsOrder extends Controller
{

    public function __construct(private OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function __invoke($idOrder)
    {
        try {
            $items = $this->orderService->fetchItemsOrder($idOrder);
            return response()->json([
                'items' => $items
            ],200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}