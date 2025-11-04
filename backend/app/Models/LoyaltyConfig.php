<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoyaltyConfig extends Model
{
    use HasUuids;

    protected $fillable = [
        'business_id', 'base_amount', 'points_awarded',
        'welcome_enabled', 'welcome_points',
        'expiration_enabled', 'expiration_days'
    ];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }
}
