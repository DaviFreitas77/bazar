<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TesteWebSocket implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $mensagem
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('teste'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'TesteReverb';
    }
}