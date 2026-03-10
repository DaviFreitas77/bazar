<?php

use App\Http\Controllers\Delivery\AuthDelivery;
use App\Http\Controllers\Delivery\CalculateFreteController;
use App\Http\Controllers\Delivery\MelhorEnvioController;
use Illuminate\Support\Facades\Route;

Route::prefix('delivery')->group(function () {
    Route::post('callback', AuthDelivery::class);
    Route::post('calculate-frete',CalculateFreteController::class);
});
