<?php

namespace App\Http\Controllers\MercadoPago;

use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));
#[Group('MercadoPago')]

class ProccessPaymentPix extends Controller
{
    /**
     * Process payment PIX
     */
    public function __invoke(Request $request)
    {
        try {
            $data = $request->formdata;
            $order = $request->order;

            Log::info('Processing PIX payment', ['data' => $data, 'order' => $order]);
            $client = new PaymentClient();
            $request_options = new RequestOptions();


            $payment = $client->create([
                "transaction_amount" => (float) $data['transaction_amount'],
                "payment_method_id" => $data['payment_method_id'],
                "notification_url" => env('MERCADO_PAGO_NOTIFICATION_URL'),
                "description" => "Bazar",
                "payer" => [
                    "email" => $data['payer']['email'],
                    "first_name" => $data['payer']['first_name'] ?? '',
                    "last_name" => $data['payer']['last_name'] ?? '',
                   

                ],
                "external_reference" => strval($order)
            ], $request_options);

            return response()->json($payment, Response::HTTP_OK);
        } catch (\MercadoPago\Exceptions\MPApiException $e) {

            return response()->json($e->getApiResponse()->getContent(), 400);
        }
    }
}