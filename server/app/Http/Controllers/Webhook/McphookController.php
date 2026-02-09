<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
           
        }
        return response()->json(['status' => 'success'], 200);
    }
}