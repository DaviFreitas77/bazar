<?php

use App\Http\Controllers\Delivery\AuthDelivery;
use App\Http\Controllers\Delivery\CalculateFreteController;
use Illuminate\Support\Facades\Route;

Route::prefix('delivery')->group(function () {
    Route::get('callback', AuthDelivery::class);
    Route::post('calculate-frete',CalculateFreteController::class);
});
