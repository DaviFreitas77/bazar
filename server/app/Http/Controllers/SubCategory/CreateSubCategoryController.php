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
        
        $subCategory = new SubCategory;
        $subCategory->id_category = $data['idCategory'];
        $subCategory->name = $data['name'];
        $subCategory->save();
        
        return response()->json([
            'message' => 'Subcategoria cadastrada com sucesso!',
            'subCategory' => $subCategory
        ], 201);
    }
}
