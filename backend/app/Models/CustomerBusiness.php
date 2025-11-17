<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $business_id
 * @property string $customer_id
 * @property int $cached_points
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness whereBusinessId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness whereCachedPoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerBusiness whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CustomerBusiness extends Pivot
{
    use SoftDeletes;

    protected $table = 'customer_business';
    protected $fillable = ['business_id', 'customer_id', 'cached_points'];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class, 'business_id', 'id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
