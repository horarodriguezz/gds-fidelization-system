<?php

namespace App\Http\Requests\Business\Customers;

use App\Rules\ExistingCustomerWithPhone;
use Illuminate\Foundation\Http\FormRequest;

class CreateCustomerRequest extends FormRequest {
    
  public function rules(): array {
      return [
          'first_name' => 'required|string|max:50',
          'last_name' => 'string|max:50|nullable',
          'email' => 'string|email|max:200|unique:customers,email|nullable',
          'phone_number' => ['required', 'phone:AR,INTERNATIONAL']
      ];
  }

  public function messages(): array {
      return [
          'first_name.required' => 'El nombre es obligatorio.',
          'first_name.string' => 'El nombre debe ser una cadena de texto.',
          'first_name.max' => 'El nombre no debe superar los 50 caracteres.',
          'last_name.string' => 'El apellido debe ser una cadena de texto.',
          'last_name.max' => 'El apellido no debe superar los 100 caracteres.',
          'email.string' => 'El email debe ser una cadena de texto.',
          'email.email' => 'El email no tiene un formato valido.',
          'email.unique' => 'El email pertenece a un cliente ya registrado.',
          'email.max' => 'El email no debe superar los 200 caracteres.',
          'phone_number.phone' => 'El número de teléfono no tiene un formato valido.',
          'phone_number.required' => 'El número de teléfono es obligatorio.',
      ];
  }

}