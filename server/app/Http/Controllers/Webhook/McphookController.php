<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use MercadoPago\MercadoPagoConfig;


class McphookController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        Log::info('Webhook Mercado Pago:', $request->all());


        $paymentId = $request->data['id'] ?? null;

        if ($paymentId) {
            $response = Http::get("https://api.mercadopago.com/v1/payments/{$paymentId}", [
                'access_token' => env('MERCADO_PAGO_ACCESS_TOKEN'),
            ]);

            $data = $response->json();

            Log::info('Payment Details:', $data);
        }
        return response()->json(['status' => 'success'], 200);
    }
}