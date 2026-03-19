<?php

namespace App\Http\Requests\Delivery;

use Illuminate\Foundation\Http\FormRequest;

class CalculateFreteRequest extends FormRequest
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

            'to.postal_code'   => 'required|string|size:8',

            'products'         => 'required|array|min:1',
            'products.*.id'    => 'required|string',
            // 'products.*.width' => 'required|numeric|min:0.1',
            // 'products.*.height' => 'required|numeric|min:0.1',
            // 'products.*.length' => 'required|numeric|min:0.1',
            // 'products.*.weight' => 'required|numeric|min:0.1',
            // 'products.*.insurance_value' => 'required|numeric',
            'products.*.quantity'        => 'required|integer|min:1',


        ];
    }

    public function messages(): array
    {
        return [

            'to.postal_code.required'   => 'O CEP de destino é obrigatório.',
            'products.*.width.min'      => 'A largura mínima de cada produto    deve ser 0.1cm.',
            'products.required'         => 'Você precisa adicionar ao menos um produto.',
        ];
    }
}
