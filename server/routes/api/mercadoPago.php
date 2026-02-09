<?php
use App\Http\Controllers\MercadoPago\CreatePreferenceController;
use App\Http\Controllers\MercadoPago\ProccessPaymentCard;
use App\Http\Controllers\MercadoPago\ProccessPaymentPix;
use App\Http\Controllers\Webhook\McphookController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('mcp')->group(function(){
  Route::post('/createPreference',CreatePreferenceController::class);
  Route::post('/proccessPaymentCard',ProccessPaymentCard::class);
  Route::post('/proccessPaymentPix',ProccessPaymentPix::class);
});

route::post('/webhook/mercadopago',McphookController::class);