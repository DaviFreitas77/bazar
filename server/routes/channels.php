<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('updateOrderStatus.{id}', function ($user, $id) {

    Log::info('AUTORIZANDO CANAL', [
        'user' => $user?->id,
        'id_canal' => $id,
    ]);

    return (int) $user->id === (int) $id;
});
