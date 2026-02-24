<?php

namespace App\Http\Controllers\ForgotPassword;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasword\VerifyMailRequest;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class VerifyMailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(VerifyMailRequest $request)
    {
        $data = $request->validated();

        $verify_mail_exists = User::where("email", $data['mail'])->first();

        if (!$verify_mail_exists) {
            return response()->json(['Este email não existe'], Response::HTTP_NOT_FOUND);
        }


        do {
            $code = rand(100000, 999999);
            $existing_code = PasswordReset::where('token_password_reset', $code)->first();
        } while ($existing_code);

        PasswordReset::create([
            'email_user' => $data['mail'],
            'token_password_reset' => $code
        ]);



        return response()->json([
            'message' => 'Token enviado para seu email',
            'email' => $data['mail']
        ], Response::HTTP_OK);
    }
}
