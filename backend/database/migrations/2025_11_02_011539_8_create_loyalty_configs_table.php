<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('loyalty_configs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('business_id');
            $table->decimal('baseAmount', 10, 2)->default(0);
            $table->decimal('pointAwarded', 10, 2)->default(0);
            $table->boolean('welcomeEnabled')->default(false);
            $table->integer('welcomePoints')->nullable();
            $table->boolean('expirationEnabled')->default(false);
            $table->integer('expirationDays')->nullable();
            $table->timestamps();

            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('loyalty_configs');
    }
};
