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
            $table->uuid('customer_id');
            $table->integer('points_used');
            $table->timestamps();

            $table->foreign('reward_id')->references('id')->on('rewards');
            $table->foreign('business_id')->references('id')->on('businesses');
            $table->foreign('customer_id')->references('id')->on('customers');
        });
    }

    public function down(): void {
        Schema::dropIfExists('redeems');
    }
};
