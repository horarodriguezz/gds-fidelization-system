<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('customer_business', function (Blueprint $table) {
            $table->uuid('business_id');
            $table->uuid('customer_id');
            $table->integer('cached_points')->default(0);
            $table->timestamps();

            $table->primary(['business_id', 'customer_id']);
            $table->foreign('business_id')->references('id')->on('businesses')->restrictOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->restrictOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('customer_business');
    }
};
