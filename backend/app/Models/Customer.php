<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Customer extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'phoneNumber', 'profilePic', 'email'];

    public function businesses() {
        return $this->belongsToMany(Business::class, 'customer_business')
                    ->withPivot('cached_points')
                    ->withTimestamps();
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }

    public function redeems() {
        return $this->hasMany(Redeem::class);
    }

    public function pointsLedger() {
        return $this->hasMany(PointsLedger::class);
    }
}
