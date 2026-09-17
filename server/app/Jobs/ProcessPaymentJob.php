<?php

namespace App\Jobs;

use App\Http\Controllers\ProcessPaymentController;
use App\Http\Services\MCPService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessPaymentJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private  $paymentId)
    {
        $this->paymentId = $paymentId;
        
    }

    /**
     * Execute the job.
     */
    public function handle(ProcessPaymentController $mcpService): void
    {
        Log::info("aqui");
        $mcpService->processPayment($this->paymentId);
    }
}
