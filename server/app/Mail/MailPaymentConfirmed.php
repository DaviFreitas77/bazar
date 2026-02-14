<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
class MailPaymentConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public string $numberOrder;
    public array $products;
    public string $paymentMethod;
    public float $totalOrder;
    
    /**
     * Create a new message instance.
     */
    public function __construct(string $name,string $numberOrder,array $products, string $paymentMethod,  string $totalOrder)
    {
        $this->name = $name;
        $this->numberOrder = $numberOrder;
        $this->products = $products;
        $this->paymentMethod = $paymentMethod;
        $this->totalOrder = $totalOrder;
        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Uhuul,pagamento confirmado',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.paymentConfirmed',
            with: ['name' => $this->name,'order'=>$this->numberOrder,'products'=>$this->products, 'paymentMethod'=> $this->paymentMethod, 'totalOrder' => $this->totalOrder]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
} 