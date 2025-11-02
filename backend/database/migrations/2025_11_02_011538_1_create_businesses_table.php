<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('businesses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email', 200)->unique();
            $table->string('phoneNumber', 20)->nullable();
            $table->string('name', 100);
            $table->string('adress', 150)->nullable();
            $table->string('profilePicture', 255)->nullable();
            $table->string('instagramUrl', 255)->nullable();
            $table->string('facebookUrl', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('businesses');
    }
};
