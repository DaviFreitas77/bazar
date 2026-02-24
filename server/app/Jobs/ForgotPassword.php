<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\CodeResetPassowordNotification;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ForgotPassword implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private string $email, private string $code)
    {
        $this->email = $email;
        $this->code = $code;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $user = User::where('email', $this->email)->first();

            if (!$user) {
                return;
            }

            $name = $user->name;
            $user->notify(new CodeResetPassowordNotification($name, $this->code));
        } catch (\Exception $e) {
            Log::error('ForgotPassword job failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
