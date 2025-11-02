<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Reward extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'cost', 'business_id'];

    public function business() {
        return $this->belongsTo(Business::class);
    }

    public function redeems() {
        return $this->hasMany(Redeem::class);
    }
}
