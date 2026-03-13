<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Http\Requests\Delivery\CalculateFreteRequest;
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
    public function __invoke(CalculateFreteRequest $request)
    {

        $data = $request->validated();
        $totalWeight = 0;
        $totalHeight = 0;
        $totalValue = 0;

        foreach ($data['products'] as $prod) {
            $product = Product::find($prod['id']);

            $totalWeight += $product->weight * $prod['quantity'];
            $totalHeight += $product->height * $prod['quantity'];
            $totalValue += $product->price * $prod['quantity'];
        }

        $package[] = [
            "format" => "box",
            "dimensions" => [
                "height" => max(2, $totalHeight),
                "width" => 26,
                "length" => 36,
            ],
            "weight" => max(0.1, $totalWeight),
            "insurance_value" => $totalValue,
        ];

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

                "packages" => $package,

                "options" =>  [
                    "receipt" => false,
                    "own_hand" => false
                ],

                "services" => "1,2,18"
            ]);

            if ($response->successful()) {
                $data = $response->json();

                Log::info("Frete calculado", $data);

                $filterServices = array_values(array_filter(
                    $data,
                    fn($service) => in_array($service['name'], ['PAC', 'SEDEX']) && empty($service['error'])
                ));

                return response()->json($filterServices);
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
