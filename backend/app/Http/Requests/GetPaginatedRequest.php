<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPaginatedRequest extends FormRequest {

  public function rules(): array {
      return [
          'page' => 'integer|min:1|nullable',
          'per_page' => 'integer|min:1|max:100|nullable'
      ];
  }

  public function messages(): array {
      return [
          'page.integer' => 'La página debe ser un número entero.',
          'page.min' => 'La página debe ser al menos 1.',
          'per_page.integer' => 'Los elementos por página deben ser un número entero.',
          'per_page.min' => 'Los elementos por página deben ser al menos 1.',
          'per_page.max' => 'Los elementos por página no deben superar los 100.'
      ];
  }
}