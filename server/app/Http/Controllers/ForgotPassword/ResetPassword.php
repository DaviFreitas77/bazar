<?php

namespace App\Http\Controllers\ForgotPassword;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasword\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class ResetPassword extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ResetPasswordRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json(['message' => "Usuario inexistente"], Response::HTTP_NOT_FOUND);
        }

        $hashPassword = Hash::make($data['newPassword']);
        $user->password = $hashPassword;
        $user->save();

        return response()->json(['message' => "Senha alterada!"], Response::HTTP_OK);
    }
}
