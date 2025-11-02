<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PointsLedger extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'points_ledger';
    protected $fillable = [
        'business_id', 'customer_id', 'purchase_id', 'redeem_id',
        'points_change', 'type', 'created_at', 'reason'
    ];

    public function business() {
        return $this->belongsTo(Business::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function purchase() {
        return $this->belongsTo(Purchase::class);
    }

    public function redeem() {
        return $this->belongsTo(Redeem::class);
    }
}
