<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CustomerBusiness extends Pivot
{
    protected $table = 'customer_business';
    protected $fillable = ['business_id', 'customer_id', 'cached_points'];
}
