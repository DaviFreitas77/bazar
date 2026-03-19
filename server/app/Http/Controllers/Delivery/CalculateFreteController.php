<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Http\Requests\Delivery\CalculateFreteRequest;
use App\Http\Services\DeliveryService;


class CalculateFreteController extends Controller
{
    /**
     * Handle the incoming request.
     */

    public function __construct(private DeliveryService $deliveryService)
    {
        $this->deliveryService = $deliveryService;
    }
    public function __invoke(CalculateFreteRequest $request)
    {

        $data = $request->validated();

        return $this->deliveryService->CalcFreight($data);
    }
}
