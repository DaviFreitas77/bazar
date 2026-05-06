<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeleteNotificationController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $notification = Notification::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$notification) {
            return response()->json(['message' => 'Notificação não encontrada'], Response::HTTP_NOT_FOUND);
        }

        $notification->delete();

        return response()->json(['message' => 'Notificação removida com sucesso']);
    }
}
