<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Http\Requests\Delivery\CalculateFreteRequest;
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
    public function __invoke(CalculateFreteRequest $request)
    {

        $data = $request->validated();

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
                    "postal_code" => env('POSTAL_CODE')
                ],

                "to" => [
                    "postal_code" => $data['to']['postal_code']
                ],

                "products" => $data['products']
            ]);

            if ($response->successful()) {
                $data = $response->json();

                Log::info("Frete calculado", $data);
                // $filterServices = array_filter(
                //     $data,
                //     fn($service) =>
                //     in_array($service['name'], ['PAC', 'SEDEX'])
                // );

                return response()->json($data);
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
