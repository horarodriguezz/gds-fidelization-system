<?php

use App\Http\Controllers\Business\AuthController as BusinessAuthController;
use App\Http\Controllers\Business\CustomerController;
use App\Http\Controllers\Business\UserController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::prefix('business')->group(function () {
    Route::prefix('auth')->controller(BusinessAuthController::class)->group(function () {
        Route::post('/register', 'register');

        Route::post('/login', 'login');

        Route::get('/email/verify/{id}/{hash}', 'verify')->middleware(['signed'])->name('verification.verify');

        Route::post('/revalidate-email', 'revalidateEmail');

        Route::post('/logout', 'logout')->middleware('auth:sanctum');

        Route::get('/me', 'me')->middleware('auth:sanctum');

        Route::get('/complete-registration/{user}', 'validateInvitationLink')->middleware('signed')->name('user.complete-registration');

        Route::post('/complete-registration/{user}', 'completeRegistration')->middleware('signed');
    });

    Route::prefix('customers')->controller(CustomerController::class)->middleware('auth:sanctum')->group(function () {
        Route::post('/', 'create');

        Route::get('/', 'get');

        Route::put('/{customer}', 'update');

        Route::delete('/{customerId}', 'deleteCustomerRelation');

        Route::get('/metrics', 'getCustomersDashboard');
    });

    Route::prefix('users')->controller(UserController::class)->middleware('auth:sanctum')->group(function () {
        Route::get('/', 'getUsers');

        Route::post('/', 'create');

        Route::delete('/{userId}', 'delete');

        Route::put('/{user}', 'update');
    });
});

Route::post('/contacts', [ContactController::class, 'create']);