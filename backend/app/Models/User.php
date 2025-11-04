<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasUuids;
    use Notifiable;

    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'phone_number', 'role', 'business_id', 'confirmed'];

    public function business(): BelongsTo {
        return $this->belongsTo(Business::class);
    }
}
