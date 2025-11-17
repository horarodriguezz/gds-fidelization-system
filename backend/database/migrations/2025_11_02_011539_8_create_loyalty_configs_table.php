<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('loyalty_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('base_amount', 10, 2)->nullable()->default(100);
            $table->decimal('points_awarded', 10, 2)->nullable()->default(10);
            $table->boolean('welcome_enabled')->nullable()->default(false);
            $table->integer('welcome_points')->nullable()->default(50);
            $table->boolean('expiration_enabled')->nullable()->default(false);
            $table->integer('expirationDays')->nullable()->default(365);
            $table->timestamps();


            $table->uuid('business_id');
            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('loyalty_configs');
    }
};
