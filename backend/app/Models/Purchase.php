<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Purchase extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['amount', 'createdAt', 'points', 'businessId', 'customerId', 'isVoided', 'paymentMethod'];

    public function business() {
        return $this->belongsTo(Business::class, 'businessId');
    }

    public function customer() {
        return $this->belongsTo(Customer::class, 'customerId');
    }

    public function pointsLedger() {
        return $this->hasMany(PointsLedger::class);
    }
}
