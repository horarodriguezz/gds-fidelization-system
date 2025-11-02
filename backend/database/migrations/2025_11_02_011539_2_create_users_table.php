<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('password', 255);
            $table->string('name', 100);
            $table->string('email', 200)->unique();
            $table->string('phoneNumber', 20)->nullable();
            $table->enum('role', ['admin', 'employee']);
            $table->uuid('business_id');
            $table->timestamps();

            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
