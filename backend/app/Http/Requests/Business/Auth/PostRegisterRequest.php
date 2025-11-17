<?php

namespace App\Http\Requests\Business\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PostRegisterRequest extends FormRequest {
    public function rules(): array {
        return [
            'first_name' => 'required|string|max:50',
            'last_name' => 'string|max:50|nullable',
            'email' => 'required|string|email|max:200|unique:users',
            'password' => 'required|string|min:8|max:30|confirmed|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/',
            'business_name' => 'required|string|max:100',
        ];
    }

    public function messages(): array {
        return [
            'first_name.required' => 'El nombre es obligatorio.',
            'last_name.required' => 'El apellido es obligatorio.',
            'first_name.max' => 'El nombre no debe superar los 50 caracteres.',
            'last_name.max' => 'El apellido no debe superar los 50 caracteres.',
            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email no tiene un formato valido.',
            'email.unique' => 'El email pertenece a un usuario ya registrado.',
            'email.max' => 'El email no debe superar los 200 caracteres.',
            'password.required' => 'El contraseña es obligatorio.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.max' => 'El largo de la contraseña no debe superar los 30 caracteres.',
            'password.regex' => 'La contraseña debe contener al menos 1 minúscula, 1 mayúscula y 1 número.',
            'business_name.required' => 'El nombre de negocio es obligatorio.',
            'business_name.max' => 'El nombre de negocio no debe superar los 100 caracteres.',
        ];
    }
}
