<?php

use App\Enums\PaymentMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('purchases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('amount', 10, 2);
            $table->decimal('points', 10, 2)->default(0);
            $table->uuid('business_id');
            $table->uuid('customer_id');
            $table->enum('payment_method', PaymentMethod::cases())->nullable()->default(PaymentMethod::CASH);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('business_id')->references('id')->on('businesses');
            $table->foreign('customer_id')->references('id')->on('customers');
        });
    }

    public function down(): void {
        Schema::dropIfExists('purchases');
    }
};
