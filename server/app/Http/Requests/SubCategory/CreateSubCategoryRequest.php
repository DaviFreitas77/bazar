<?php

namespace App\Http\Requests\SubCategory;

use Illuminate\Foundation\Http\FormRequest;

class CreateSubCategoryRequest extends FormRequest
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
            "idCategory" => "required|integer",
            "name" => "required|string|min:4|max:100",
        ];
    }

    public function messages(): array
    {
        return [
            "idCategory.required" => "A categoria é obrigatória.",
            "name.required" => "O nome da subcategoria é obrigatório.",
            "name.string" => "O nome deve ser texto.",
            "name.min" => "O nome deve ter no mínimo 4 caracteres.",
            "name.max" => "O nome deve ter no máximo 100 caracteres.",
        ];
    }
}
