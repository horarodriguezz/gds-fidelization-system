<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'email', 'password', 'phoneNumber', 'role', 'business_id'];

    public function business() {
        return $this->belongsTo(Business::class);
    }
}
