<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shopping\StoreShoppingRequest;
use App\Http\Services\ShoppingCartService;
use App\Models\Product;
use App\Models\ProductShoppingCart;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DecrementProduct extends Controller
{
    /**
     * Handle the incoming request.
     */

    public function __construct(private ShoppingCartService $shoppingCartService)
    {
        $this->shoppingCartService = $shoppingCartService;
    }

    public function __invoke(StoreShoppingRequest $request)
    {
        $data = $request->validated();
        $idUser = $request->user()->id;

        $cartId = ShoppingCart::where('fkUser', $idUser)->first()->id;

        $shoppingCart = ShoppingCart::find($cartId);

        $priceProduct = Product::where('id', $data['idProduct'])->first()->price;


        //verifica se o produto existe no carrinho,se sim ,diminui a quantidade
        $existingProduct = ProductShoppingCart::where('fkShoppingCart', $cartId)
            ->where('fkProduct', $data['idProduct'])
            ->where('fkSize', $data['idSize'])
            ->where('fkColor', $data['idColor'])
            ->first();


        if ($existingProduct) {
            if ($existingProduct->quantity == 1) {
                $existingProduct->delete();
                return response()->json(['message' => 'produto removido do carrinho'], Response::HTTP_OK);
            }

            $existingProduct->quantity - $data['quantity'];
            $existingProduct->save();
        }

        // Atualizar totalPrice corretamente
        $shoppingCart->totalPrice -= $priceProduct * $data['quantity'];
        $shoppingCart->save();

        return response()->json(['message' => 'produto adicionado ao carrinho'], Response::HTTP_OK);
    }
}