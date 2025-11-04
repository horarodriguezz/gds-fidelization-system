<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Redeem extends Model
{
    use HasUuids;

    protected $fillable = ['reward_id', 'business_id', 'customer_id', 'points_used'];

    public function reward(): BelongsTo {
        return $this->belongsTo(Reward::class);
    }

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }
}
