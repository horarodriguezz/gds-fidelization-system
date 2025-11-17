<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('businesses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email', 200)->unique()->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->string('name', 100);
            $table->string('address', 150)->nullable();
            $table->string('profile_picture', 255)->nullable();
            $table->string('instagram_url', 255)->nullable();
            $table->string('facebook_url', 255)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('businesses');
    }
};
