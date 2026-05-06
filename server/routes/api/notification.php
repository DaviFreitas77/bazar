<?php

use App\Http\Controllers\Notification\GetNotificationsController;
use App\Http\Controllers\Notification\MarkNotificationAsReadController;
use App\Http\Controllers\Notification\DeleteNotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', GetNotificationsController::class);
    Route::patch('/notifications/{id}/read', MarkNotificationAsReadController::class);
    Route::delete('/notifications/{id}', DeleteNotificationController::class);
});
