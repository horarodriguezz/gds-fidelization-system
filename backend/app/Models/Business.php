<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Business extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['email', 'phoneNumber', 'name', 'adress', 'profilePicture', 'instagramUrl', 'facebookUrl'];

    public function users() {
        return $this->hasMany(User::class);
    }

    public function loyaltyConfig() {
        return $this->hasOne(LoyaltyConfig::class);
    }

    public function customers() {
        return $this->belongsToMany(Customer::class, 'customer_business')
                    ->withPivot('cached_points')
                    ->withTimestamps();
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }

    public function rewards() {
        return $this->hasMany(Reward::class);
    }
}
