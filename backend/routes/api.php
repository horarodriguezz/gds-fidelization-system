<?php

use App\Http\Controllers\Business\AuthController as BusinessAuthController;
use App\Http\Controllers\Business\CustomerController;
use Illuminate\Support\Facades\Route;

Route::prefix('business')->group(function () {
    Route::prefix('auth')->controller(BusinessAuthController::class)->group(function () {
        Route::post('/register', 'register');

        Route::post('/login', 'login');

        Route::get('/email/verify/{id}/{hash}', 'verify')->middleware(['signed'])->name('verification.verify');

        Route::post('/revalidate-email', 'revalidateEmail');

        Route::post('/logout', 'logout')->middleware('auth:sanctum');
    });

    Route::prefix('customers')->controller(CustomerController::class)->middleware('auth:sanctum')->group(function () {
        Route::post('/', 'create');

        Route::get('/', 'get');

        Route::put('/{customer}', 'update');

        Route::delete('/{customerId}', 'deleteCustomerRelation');
    });
});
