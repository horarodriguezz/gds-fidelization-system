<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PointsLedger extends Model
{
    use HasUuids;

    protected $table = 'points_ledger';
    protected $fillable = [
        'business_id', 'customer_id', 'purchase_id', 'redeem_id',
        'points_change', 'type', 'reason'
    ];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class);
    }

    public function purchase(): BelongsTo {
        return $this->belongsTo(Purchase::class);
    }

    public function redeem(): BelongsTo {
        return $this->belongsTo(Redeem::class);
    }
}
