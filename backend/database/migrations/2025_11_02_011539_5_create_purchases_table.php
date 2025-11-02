<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('purchases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('amount', 10, 2);
            $table->date('createdAt');
            $table->decimal('points', 10, 2)->default(0);
            $table->uuid('businessId');
            $table->uuid('customerId');
            $table->boolean('isVoided')->default(false);
            $table->string('paymentMethod', 50)->nullable();
            $table->timestamps();

            $table->foreign('businessId')->references('id')->on('businesses')->cascadeOnDelete();
            $table->foreign('customerId')->references('id')->on('customers')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('purchases');
    }
};
