<?php

namespace App\Http\Controllers\MercadoPago;

use App\Http\Controllers\Controller;
use App\Http\Services\MCPService;
use Illuminate\Http\Request;

class GetCardsSaved extends Controller
{

    public function __construct(private MCPService $mcpService)
    {
        $this->mcpService = $mcpService;
    }
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['Não autenticado'], 401);
        }

        return $this->mcpService->getCard($user->customer_id);
        
    }
}
