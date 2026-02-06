<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class NewOrderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $name,
        public string $numberOrder,
        public array $products,
        public string $telUser
    ) {}

    /**
     * Define o assunto e remetente (Metadata).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
           subject: 'Uhuuul,novo pedido fresquinho!',
            
        );
    }

    /**
     * Define a View (HTML) e os dados.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.newOrder',
            // Com propriedades públicas no construtor, o 'with' é opcional,
            // mas você pode manter se quiser renomear variáveis.
             with:['name' => $this->name,'numberOrder' => $this->numberOrder,'products' => $this->products,'tel' => $this->telUser]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}