<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LoyaltyConfig extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'business_id', 'baseAmount', 'pointAwarded',
        'welcomeEnabled', 'welcomePoints',
        'expirationEnabled', 'expirationDays'
    ];

    public function business() {
        return $this->belongsTo(Business::class);
    }
}
