<?php

namespace App\Http\Requests\Business\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PostLoginRequest extends FormRequest {
    public function rules(): array {
        return [
            'email' => 'required|string|email|max:200',
            'password' => 'required|string|min:8|max:30|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/',
        ];
    }

    public function messages(): array {
        return [
            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email no tiene un formato valido.',
            'email.unique' => 'El email pertenece a un usuario ya registrado.',
            'email.max' => 'El email no debe superar los 200 caracteres.',
            'password.required' => 'El contraseña es obligatorio.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.max' => 'El largo de la contraseña no debe superar los 30 caracteres.',
            'password.regex' => 'La contraseña debe contener al menos 1 minúscula, 1 mayúscula y 1 número.'
        ];
    }
}