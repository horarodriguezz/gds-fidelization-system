<?php

use Illuminate\Foundation\Http\FormRequest;

class CreateCustomerRequest extends FormRequest {

  public function rules(): array {
      return [
          'first_name' => 'required|string|max:50',
          'last_name' => 'string|max:100|nullable',
          'email' => 'string|email|max:200|unique:customers,email|nullable',
          'phone_number' => 'required|string|max:20|unique:customers,phone_number'
      ];
  }

}