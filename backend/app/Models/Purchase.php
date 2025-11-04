<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purchase extends Model
{
    use  HasUuids;

    protected $fillable = ['amount', 'points', 'business_id', 'customer_id', 'payment_method'];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function pointsLedger(): HasMany {
        return $this->hasMany(PointsLedger::class);
    }
}
