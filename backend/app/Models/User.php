<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'email', 'password', 'phone_number', 'role', 'business_id', 'confirmed'];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }
}
