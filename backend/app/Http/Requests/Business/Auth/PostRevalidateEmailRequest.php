<?php

namespace App\Http\Requests\Business\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PostRevalidateEmailRequest extends FormRequest {
    public function rules(): array {
        return [
            'email' => 'required|string|email|max:200|exists:users,email',
        ];
    }

    public function messages(): array {
        return [
            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email no tiene un formato valido.',
            'email.max' => 'El email no debe superar los 200 caracteres.',
            'email.exists' => 'No hemos encontrado un usuario con el email especificado.',
        ];
    }
}