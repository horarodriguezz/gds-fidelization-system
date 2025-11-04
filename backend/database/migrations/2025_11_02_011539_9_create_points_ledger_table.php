<?php

use App\Enums\PointsOperation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('points_ledger', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('points_change');
            $table->enum('type', PointsOperation::cases());
            $table->string('reason', 255)->nullable();
            $table->timestamps();

            $table->uuid('business_id');
            $table->uuid('customer_id');
            $table->uuid('purchase_id')->nullable();
            $table->uuid('redeem_id')->nullable();
            $table->foreign('business_id')->references('id')->on('businesses')->cascadeOnDelete();
            $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnDelete();
            $table->foreign('purchase_id')->references('id')->on('purchases')->nullOnDelete();
            $table->foreign('redeem_id')->references('id')->on('redeems')->nullOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('points_ledger');
    }
};
