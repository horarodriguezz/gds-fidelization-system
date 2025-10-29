<?php

namespace App\Exceptions;

use Exception;

class AppException extends Exception 
{
  public ?array $data;

  public function __construct(string $message, int $code = 400, ?array $data = null)
  {
    parent::__construct($message, $code);
    $this->data = $data;
  }
}