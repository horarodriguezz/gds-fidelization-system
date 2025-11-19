<?php

namespace App\Http\Requests\Business\Users;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest {
    public function rules(): array {
        return [
            'first_name' => 'string|max:50|nullable',
            'last_name' => 'string|max:50|nullable',
            'phone_number' => 'phone:AR,INTERNATIONAL|nullable',
            'role' => ['nullable', Rule::enum(Role::class)->except(Role::OWNER)]
        ];
    }

    public function messages(): array {
        return [
            'first_name.max' => 'El nombre no debe superar los 50 caracteres.',
            'last_name.max' => 'El apellido no debe superar los 50 caracteres.',
            'phone_number.phone' => 'El número de teléfono no tiene un formato válido.',
            'role.enum' => 'El rol seleccionado no es válido.'
        ];
    }
}
