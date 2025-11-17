<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $name
 * @property int $cost
 * @property string $business_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Business $business
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Redeem> $redeems
 * @property-read int|null $redeems_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereBusinessId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Reward extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'cost', 'business_id'];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }

    public function redeems(): HasMany {
        return $this->hasMany(Redeem::class);
    }
}
