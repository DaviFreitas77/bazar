<?php

namespace App\Http\Requests\ForgotPasword;

use Illuminate\Foundation\Http\FormRequest;

class VerifyCodeRequest extends FormRequest
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
            "code" => "string"
        ];
    }

    public function messages(): array
    {
        return [
            "code.string" => "O cóigo deve ser uma string",
        ];
    }
}
