<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Redeem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['reward_id', 'business_id', 'customerId', 'pointsUsed', 'createdAt'];

    public function reward() {
        return $this->belongsTo(Reward::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class, 'customerId');
    }

    public function business() {
        return $this->belongsTo(Business::class);
    }
}
