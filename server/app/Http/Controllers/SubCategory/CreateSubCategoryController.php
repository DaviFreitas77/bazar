<?php

namespace App\Http\Controllers\SubCategory;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategory\CreateSubCategoryRequest;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class CreateSubCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateSubCategoryRequest $request)
    {
        $data = $request->validated();

        $subCategory = SubCategory::create([
            'id_category' => $data['idCategory'],
            'name' => $data['name'],
        ]);
        return response()->json([
            'message' => 'Subcategoria cadastrada com sucesso!',
            'subCategory' => $subCategory
        ], 201);
    }
}
