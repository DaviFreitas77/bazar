<?php

namespace App\Http\Services;

use App\Models\Category;
use App\Models\Colors;
use Illuminate\Http\Response;

class CategoryService
{

  public function createCategory(array $data)
  {

    $existingCategpry = Category::where('name', $data['name'])->first();

    if ($existingCategpry) {
      return response()->json(['message' => "Categoria ja cadastrada"], Response::HTTP_CONFLICT);
    }

    $category = new Category;
    $category->name = $data['name'];
    $category->save();

    return response()->json(['message' => "categoria cadastrada"], 201);
  }


  public function listAllCategories()
  {
    return Category::all();
  }
}
