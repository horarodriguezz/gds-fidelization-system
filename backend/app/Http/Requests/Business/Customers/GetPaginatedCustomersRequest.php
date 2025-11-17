<?php

namespace App\Http\Requests\Business\Customers;

use App\Http\Requests\GetPaginatedRequest;

class GetPaginatedCustomersRequest extends GetPaginatedRequest {

  public function rules(): array {
      $baseRules = parent::rules();

      return array_merge($baseRules, [
          'search' => 'string|max:100|nullable',
          'last_visited_after' => 'date|nullable',
          'last_visited_before' => 'date|nullable'
      ]);
  }

  public function messages(): array {
      $baseMessages = parent::messages();

      return array_merge($baseMessages, [
          'search.string' => 'La búsqueda debe ser una cadena de texto.',
          'search.max' => 'La búsqueda no debe superar los 100 caracteres.',
          'last_visited_after.date' => 'La fecha de última visita (después) debe ser una fecha válida.',
          'last_visited_before.date' => 'La fecha de última visita (antes) debe ser una fecha válida.'
      ]);
  }

}