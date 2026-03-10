<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
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
    public function __invoke(Request $request)
    {
        try {
            $token = Cache::get('delivery_token');

            Log::info($token);
            if (!$token) {
                return response()->json([
                    'message' => 'Token não encontrado'
                ], 401);
            }

            $response = Http::withHeaders([
                'User-Agent' => 'ecommerce (contato@meusite.com)',
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ])->post('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', [

                "from" => [
                    "postal_code" => "96020360"
                ],

                "to" => [
                    "postal_code" => "01018020"
                ],

                "products" => [
                    [
                        "id" => "Produto A",
                        "width" => 11,
                        "height" => 17,
                        "length" => 11,
                        "weight" => 1,
                        "insurance_value" => 10.1,
                        "quantity" => 1
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                Log::info("Frete calculado", $data);
                return response($data);
            } else {
                $data = $response->json();
                Log::error("Erro ao calcular frete", $data);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => "Não foi possivel calcular o frete"]);
        }
    }
}
