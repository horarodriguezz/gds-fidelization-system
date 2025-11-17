<?php

namespace App\Enums;

enum ErrorSubCode: int
{
  /**
   * cases 4001000 - 4001999 are reserved for Auth related errors
   */
  case MAIL_NOT_VERIFIED = 4001000;

  /**
   * cases 4002000 - 4002999 are reserved for Customer related errors
   */
  case CUSTOMER_ALREADY_VERIFIED = 4002000;

  case PHONE_NUMBER_ALREADY_USED_BY_ANOTHER_CUSTOMER = 4002001;
  
}