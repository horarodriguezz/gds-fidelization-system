<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class UserInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public string $invitationUrl;
    public string $businessName;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->businessName = $user->business->name ?? 'Empresa';
        
        // Crear URL firmada que expira en 48 horas
        $signedUrl = URL::temporarySignedRoute(
            'user.complete-registration',
            now()->addHours(48),
            ['user' => $user->id]
        );
        
        // Extraer signature de la URL firmada
        $urlParts = parse_url($signedUrl);
        parse_str($urlParts['query'] ?? '', $queryParams);
        
        // Construir URL del frontend con todos los parámetros
        $frontendUrl = config('app.frontend_url');
        $this->invitationUrl = $frontendUrl . '/complete-registration?' . http_build_query([
            'user_id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'role' => $user->role,
            'signature' => $queryParams['signature'] ?? '',
            'expires' => $queryParams['expires'] ?? '',
        ]);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitación - Completa tu registro'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.UserInvitation',
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