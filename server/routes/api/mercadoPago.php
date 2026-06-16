<?php


use App\Http\Controllers\MercadoPago\CreatePreferenceController;
use App\Http\Controllers\MercadoPago\GetCardsSaved;
use App\Http\Controllers\MercadoPago\GetCustomerController;
use App\Http\Controllers\MercadoPago\ProccessPaymentCard;
use App\Http\Controllers\MercadoPago\ProccessPaymentPix;
use App\Http\Controllers\MercadoPago\SaveCardController;
use App\Http\Controllers\Webhook\McphookController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('mcp')->group(function () {
  Route::post('/createPreference', CreatePreferenceController::class);
  Route::post('/proccessPaymentCard', ProccessPaymentCard::class);
  Route::post('/proccessPaymentPix', ProccessPaymentPix::class);
  Route::get('/getCustomer', GetCustomerController::class);
  Route::post('/saveCard', SaveCardController::class);
  Route::get('/getCardsSaved', GetCardsSaved::class);
});

Route::post('/webhook/mercadopago', McphookController::class);
