<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
