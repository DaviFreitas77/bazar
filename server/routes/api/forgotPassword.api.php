<?php

use App\Http\Controllers\ForgotPassword\ResetPassword;
use App\Http\Controllers\ForgotPassword\VerifyCode;
use App\Http\Controllers\ForgotPassword\VerifyMailController;
use Illuminate\Support\Facades\Route;

Route::prefix('forgot-password')->group(function () {
  Route::post('/verify-email', VerifyMailController::class);
  Route::post('/verify-code', VerifyCode::class);
  Route::patch('/reset-password', ResetPassword::class);
});
