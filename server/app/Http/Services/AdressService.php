<?php

namespace App\Http\Services;

use App\Models\Logradouro;
use App\Models\User;
use ErrorException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AdressService
{


  public function createLogradouro(array $data, User $user)
  {
    try {
      $idUser = $user['id'];


      $logradouro = new logradouro;
      $logradouro->type = $data['street'];
      $logradouro->zip_code = $data['zip_code'];
      $logradouro->district = $data['district'];
      $logradouro->city = $data['city'];
      $logradouro->state = $data['state'];
      $logradouro->number = $data['number'];
      $logradouro->fk_user = $idUser;
      $logradouro->save();

      return response()->json(['id' => $logradouro->id], Response::HTTP_CREATED);
    } catch (ErrorException $e) {
      return response()->json($e->getMessage());
    }
  }


  public function adressByUser(User $user)
  {
    $idUser = $user['id'];

    $adressUser = Logradouro::where('fk_user', $idUser)->get();

    return $adressUser;
  }

  public function deleteAdressById($id)
  {
    $adress = Logradouro::find($id);

    if (!$adress) {
      return response()->json([
        'message' => 'Endereço não encontrado.'
      ], Response::HTTP_NOT_FOUND);
    }

    $adress->delete();

    return response()->json([
      'message' => 'Endereço deletado com sucesso.'
    ], Response::HTTP_OK);
  }


  public function CheckZipCode($data)
  {
    try {
      $response = Http::get('https://brasilapi.com.br/api/cep/v1/' . $data['zipCode']);

      if ($response->successful()) {
        Log::info("Busca de CEP realizada");
        $data = $response->json();

        return response()->json([
          "bairro" => $data['neighborhood'],
          "zip_code" => $data['cep'],
          "logradouro" => $data['street'],
          "uf" => $data['state'],
          "localidade" => $data['city'],

        ]);
      } else {
        Log::error("erro ao buscar cep");
        return response()->json($response->json());
      }
    } catch (Exception $e) {
      Log::error($e->getMessage());
    }

    return response()->json([
      'message' => 'Não foi possível localizar o CEP. Por favor, preencha manualmente.',

    ], 502);
  }
}
