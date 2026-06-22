<?php

namespace App\Http\Controllers\MercadoPago;

use App\Http\Controllers\Controller;
use App\Http\Services\MCPService;
use Illuminate\Http\Request;

class DeleteCardController extends Controller
{
    public function __construct(private MCPService $mcpService)
    {
    }

    public function __invoke(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Nao autenticado'], 401);
        }

        $cardId = $request->input('cardId');

        if (!$cardId) {
            return response()->json(['message' => 'Cartao nao informado'], 422);
        }

        return $this->mcpService->deleteCard($user->customer_id, $cardId);
    }
}
