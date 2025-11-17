<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $amount
 * @property string $points
 * @property string $business_id
 * @property string $customer_id
 * @property string|null $payment_method
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Models\Business $business
 * @property-read \App\Models\Customer $customer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PointsLedger> $pointsLedger
 * @property-read int|null $points_ledger_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereBusinessId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
