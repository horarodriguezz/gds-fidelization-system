<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'phone_number', 'profile_picture', 'email'];

    public function businesses(): BelongsToMany {
        return $this->belongsToMany(Business::class, 'customer_business')
                    ->withPivot('cached_points')
                    ->withTimestamps();
    }

    public function purchases(): HasMany {
        return $this->hasMany(Purchase::class);
    }

    public function redeems(): HasMany {
        return $this->hasMany(Redeem::class);
    }

    public function pointsLedger(): HasMany {
        return $this->hasMany(PointsLedger::class);
    }
}
