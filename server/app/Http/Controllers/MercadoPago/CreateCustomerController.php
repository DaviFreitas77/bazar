<?php

namespace App\Http\Controllers\MercadoPago;

use App\Http\Controllers\Controller;
use App\Http\Services\MCPService;
use Illuminate\Http\Request;

class CreateCustomerController extends Controller
{
    public function __construct(private MCPService $mcPService)
    {
        $this->mcPService = $mcPService;
    }
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['Não autenticado'], 401);
        }

        $email = $user->email;
        $name = $user->name;

        return $this->mcPService->createCustomer($email, $name, $user);
    }
}
