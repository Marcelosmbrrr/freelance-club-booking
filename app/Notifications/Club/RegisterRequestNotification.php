<?php

namespace App\Notifications\Club;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegisterRequestNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Solicitação de Cadastro Recebida')
            ->greeting('Olá, ' . $notifiable->name . '!')
            ->line('Recebemos a sua solicitação para cadastrar o seu clube em nosso sistema. Aqui estão os dados enviados:')
            ->line('**Nome do Clube:** ' . $notifiable->name)
            ->line('**Nome Fantasia:** ' . $notifiable->trading_name)
            ->line('**CNPJ:** ' . $notifiable->cnpj)
            ->line('**E-mail:** ' . $notifiable->email)
            ->line('**Telefone:** ' . $notifiable->phonenumber)
            ->line('**Estado:** ' . $notifiable->state)
            ->line('**Cidade:** ' . $notifiable->city)
            ->line('Nosso time está analisando o pedido e, em breve, entraremos em contato para informar o status do cadastro.')
            ->line('Se precisar de mais informações ou tiver dúvidas, não hesite em nos contatar por este mesmo e-mail.')
            ->salutation('Atenciosamente, App');

    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
