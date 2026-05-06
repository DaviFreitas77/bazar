<?php
namespace App\Http\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Response;

Class NotificationService
{
    public function __construct()
    {
    }

    public function createNotification(string $type, string $content)
    {
        $admin = User::where('role', 'admin')->first();

        Notification::create([
            'user_id' => $admin->id,
            'type' => $type,
            'content' => $content,
            'is_read' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Notificação criada com sucesso'], Response::HTTP_CREATED);
    }
}