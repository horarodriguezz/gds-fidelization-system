<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Role;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('password', 255)->nullable();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email', 200)->unique();
            $table->string('phone_number', 20)->nullable();
            $table->enum('role', Role::cases())->default(Role::USER);
            $table->dateTime('email_verified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->uuid('business_id');
            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
