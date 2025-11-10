<?php

use App\Http\Controllers\Business\AuthController as BusinessAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('business')->group(function () {
    Route::prefix('auth')->controller(BusinessAuthController::class)->group(function () {
        Route::post('/register', 'register');

        Route::post('/login', 'login');

        Route::get('/email/verify/{id}/{hash}', 'verify')->middleware(['signed'])->name('verification.verify');
    });
});
