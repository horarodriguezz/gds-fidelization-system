<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'business_name',
        'email',
        'message',
        'first_name',
        'last_name',
    ];
}
