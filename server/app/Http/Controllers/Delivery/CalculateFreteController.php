<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Http\Requests\Delivery\CalculateFreteRequest;
use App\Http\Services\DeliveryService;
use App\Models\Product;
use ErrorException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
