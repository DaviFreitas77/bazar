<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Support\Facades\Cache;

class AuthDelivery extends Controller
{
    public function __invoke(Request $request)
    {

        $code = $request->code;

        if (!$code) {
            return response()->json(['error' => 'Código de autorização não encontrado.'], 400);
        }
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'ecommerce (contato@meusite.com)',
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->post('https://sandbox.melhorenvio.com.br/oauth/token', [
                "grant_type" => "authorization_code",
                "client_id" => env('DELIVERY_CLIENT_ID'),
                "client_secret" => env('DELIVERY_CLIENT_SECRET'),
                'redirect_uri' => env('DELIVERY_REDIRECT'),
                'code' => $code
            ]);

            if ($response->successful()) {
                $data = $response->json();
                Cache::put('delivery_token', $data['access_token'], $data['expires_in']);

                Log::info("delivery_token salvo");
            } else {
                return response()->json([
                    'error' => 'Falha ao gerar token',
                    'details' => $response->json()
                ], $response->status());
            }
        } catch (Exception $e) {

            Log::error('Erro ao gerar token : ' . $e->getMessage());

            return response()->json([
                'error' => 'Erro inesperado ao gerar token',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
