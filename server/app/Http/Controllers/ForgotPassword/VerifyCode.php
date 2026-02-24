<?php

namespace App\Http\Controllers\ForgotPassword;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasword\VerifyCodeRequest;
use App\Models\PasswordReset;

use Illuminate\Http\Response;

class VerifyCode extends Controller
{
    /**
     * Reset password
     */
    public function __invoke(VerifyCodeRequest $request)
    {
        $data = $request->validated();

        $verifyCode = PasswordReset::where('token_password_reset', $data['code'])->first();

        if (!$verifyCode) {
            return response()->json(['message' => "Código inválido"], Response::HTTP_NOT_FOUND);
        }

        $verifyCode->delete();
        return Response::HTTP_OK;
    }
}
