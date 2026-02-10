<?php

namespace App\Http\Controllers\MercadoPago;

use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;


#[Group('MercadoPago')]
class ProccessPaymentPix extends Controller
{

    public function __invoke($formdata, $order)
    {
        try {
            $data = $formdata;
            $order = $order;

            if (!$data) {
                return response()->json(["error" => "formData ausente"], 400);
            }
            $client = new PaymentClient();
            $request_options = new RequestOptions();


            $payment = $client->create([
                "transaction_amount" => (float) $data['transaction_amount'],
                "payment_method_id" => $data['payment_method_id'],
                "payer" => [
                    "email" => $data["payer"]["email"],
                    "identification" => [
                        "type"   => $data["payer"]["identification"]["type"],
                        "number" => $data["payer"]["identification"]["number"]
                    ]
                ],
                "external_reference" => strval($order),
            ], $request_options);

            return response()->json($payment, Response::HTTP_OK);
        } catch (ErrorException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}