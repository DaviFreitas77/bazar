<?php

use App\Http\Controllers\Banner\CreateBannerController;
use App\Http\Controllers\Banner\FetchBannerController;
use Illuminate\Support\Facades\Route;

Route::prefix('banner')->group(function () {
    Route::post('/create', CreateBannerController::class);
    Route::get('/fetch', FetchBannerController::class);
});
