<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string $id
 * @property string|null $email
 * @property string|null $phone_number
 * @property string $name
 * @property string|null $address
 * @property string|null $profile_picture
 * @property string|null $instagram_url
 * @property string|null $facebook_url
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Customer> $customers
 * @property-read int|null $customers_count
 * @property-read \App\Models\LoyaltyConfig|null $loyaltyConfig
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Purchase> $purchases
 * @property-read int|null $purchases_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Reward> $rewards
 * @property-read int|null $rewards_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereFacebookUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereInstagramUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereProfilePicture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Business whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Business extends Model
{
    use HasUuids;

    protected $fillable = ['email', 'phone_number', 'name', 'address', 'profile_picture', 'instagram_url', 'facebook_url'];

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }

    public function loyaltyConfig(): HasOne {
        return $this->hasOne(LoyaltyConfig::class);
    }

    public function customers(): BelongsToMany {
        return $this->belongsToMany(Customer::class, 'customer_business')
                    ->withPivot('cached_points')
                    ->withTimestamps();
    }

    public function purchases(): HasMany {
        return $this->hasMany(Purchase::class);
    }

    public function rewards(): HasMany {
        return $this->hasMany(Reward::class);
    }
}
