<?php

namespace App\Http\Requests\ForgotPasword;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "email" => "email|string|required",
            "code" => "string|required",
            "newPassword"=>"string|required|min:8"
        ];
    }


    public function messages(): array
    {
        return [
            "email.required" => "Email obrigatório",
            "code.required" => "Código obrigatório",
            "newPassword.required"=> "Senha obrigatória",
            "newPassword.min" => "A senhad deve conter no minímo 8 caractéres"

        ];
    }
}
