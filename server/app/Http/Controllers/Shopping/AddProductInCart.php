<?php

namespace App\Http\Controllers\Shopping;

use App\Http\Controllers\Controller;
use App\Http\Requests\Shopping\StoreShoppingRequest;
use App\Http\Services\ShoppingCartService;
use App\Models\Product;
use App\Models\ProductShoppingCart;
use App\Models\ShoppingCart;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

#[Group('Shopping Cart')]
class AddProductInCart extends Controller
{
    /**
     * Add product in shopping cart.
     */

    public function __construct(private ShoppingCartService $shoppingCartService)
    {
        $this->shoppingCartService = $shoppingCartService;
    }

    public function __invoke(StoreShoppingRequest $request)
    {

        $data = $request->validated();
        $idUser = $request->user()->id;

        //verifica se o carrinho ja existe e retorta id,se não,cria um e retorna o id 
        $cartId = $this->shoppingCartService->createShoppingCart($idUser);

        $shoppingCart = ShoppingCart::find($cartId);

        $priceProduct = Product::where('id', $data['idProduct'])->first()->price;

        $verifyProductStock = Product::where('id', $data['idProduct'])->first()->stock;




        //verifica se o produto existe no carrinho,se sim ,soma na quantidade
        $existingProduct = ProductShoppingCart::where('fkShoppingCart', $cartId)
            ->where('fkProduct', $data['idProduct'])
            ->where('fkSize', $data['idSize'])
            ->where('fkColor', $data['idColor'])
            ->first();


        if ($existingProduct) {

            $newQuantity = $existingProduct->quantity + $data['quantity'];
            if ($newQuantity > $verifyProductStock) {
                return response()->json(['message' => 'Quantidade indisponível no estoque '], Response::HTTP_BAD_REQUEST);
            }

            $existingProduct->quantity += $data['quantity'];
            $existingProduct->save();
        } else {
            $product = new ProductShoppingCart();
            $product->fkShoppingCart = $cartId;
            $product->fkProduct = $data['idProduct'];
            $product->fkSize = $data['idSize'];
            $product->fkColor = $data['idColor'];
            $product->quantity = $data['quantity'];
            $product->save();
        }

        // Atualizar totalPrice corretamente
        $shoppingCart->totalPrice += $priceProduct * $data['quantity'];
        $shoppingCart->save();

        return response()->json(['message' => 'produto adicionado ao carrinho'], Response::HTTP_OK);
    }
}