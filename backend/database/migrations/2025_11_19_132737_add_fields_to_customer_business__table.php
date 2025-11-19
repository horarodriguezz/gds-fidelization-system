<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customer_business', function (Blueprint $table) {
            $table->dateTime('last_visit_at')->nullable()->after('cached_points');
            $table->integer('total_visits')->default(0)->after('last_visit_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customer_business', function (Blueprint $table) {
            $table->dropColumn('last_visit_at');
            $table->dropColumn('total_visits');
        });
    }
};
