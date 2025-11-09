<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property int $points_change
 * @property string $type
 * @property string|null $reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $business_id
 * @property string $customer_id
 * @property string|null $purchase_id
 * @property string|null $redeem_id
 * @property-read \App\Models\Business $business
 * @property-read \App\Models\Customer $customer
 * @property-read \App\Models\Purchase|null $purchase
 * @property-read \App\Models\Redeem|null $redeem
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereBusinessId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger wherePointsChange($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger wherePurchaseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereRedeemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PointsLedger whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
