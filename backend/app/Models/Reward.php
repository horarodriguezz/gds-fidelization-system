<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
