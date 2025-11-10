<?php

namespace App\Exceptions;

use App\Enums\ErrorSubCode;
use Exception;

class AppException extends Exception 
{
  public ?ErrorSubCode $subcode;
  public ?array $data;

  public function __construct(string $message, int $code = 400, ?array $data = null, ?ErrorSubCode $subcode = null)
  {
    parent::__construct($message, $code);
    $this->data = $data;
    $this->subcode = $subcode;
  }
}