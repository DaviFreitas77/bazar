<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateOrderStatus implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $mensagem
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('updateOrderStatus'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'OrderStatus';
    }
}