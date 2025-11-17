<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $reward_id
 * @property string $business_id
 * @property string $customer_id
 * @property int $points_used
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Business $business
 * @property-read \App\Models\Customer $customer
 * @property-read \App\Models\Reward $reward
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereBusinessId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem wherePointsUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereRewardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redeem whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
