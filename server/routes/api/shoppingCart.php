<?php

use App\Http\Controllers\Shopping\AddProductInCart;
use App\Http\Controllers\Shopping\DecrementProduct;
use App\Http\Controllers\Shopping\GetCartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')
    ->prefix('shoppingCart')
    ->group(function () {
        Route::post('/add', AddProductInCart::class);
        Route::get('/getCart', GetCartController::class);
        Route::post('/decrementProduct',DecrementProduct::class);
    });