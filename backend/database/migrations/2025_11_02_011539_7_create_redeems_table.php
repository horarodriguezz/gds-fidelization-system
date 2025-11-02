<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('redeems', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('reward_id');
            $table->uuid('business_id');
            $table->uuid('customerId');
            $table->integer('pointsUsed');
            $table->date('createdAt');
            $table->timestamps();

            $table->foreign('reward_id')->references('id')->on('rewards')->cascadeOnDelete();
            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
            $table->foreign('customerId')->references('id')->on('customers')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('redeems');
    }
};
