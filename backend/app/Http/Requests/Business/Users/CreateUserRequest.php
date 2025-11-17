<?php

namespace App\Http\Requests\Business\Users;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUserRequest extends FormRequest {
    public function rules(): array {
        return [
            'first_name' => 'required|string|max:50',
            'last_name' => 'string|max:50|nullable',
            'email' => 'required|string|email|max:200|unique:users',
            'phone_number' => 'phone:AR,INTERNATIONAL|nullable',
            'role' => ['required', Rule::enum(Role::class)->except(Role::OWNER)]
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
            'phone_number.phone' => 'El número de teléfono no tiene un formato válido.',
            'role.required' => 'El rol es obligatorio.',
            'role.enum' => 'El rol seleccionado no es válido.',
        ];
    }
}
