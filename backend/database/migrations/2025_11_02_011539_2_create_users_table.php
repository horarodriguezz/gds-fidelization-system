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
            $table->string('name', 100);
            $table->string('email', 200)->nullable();
            $table->string('phone_number', 20)->unique();
            $table->enum('role', Role::cases())->default(Role::USER);
            $table->boolean('confirmed')->default(false);
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
