<?php

use App\Http\Controllers\Business\AuthController as BusinessAuthController;
use App\Http\Controllers\Business\CustomerController;
use App\Http\Controllers\Business\UserController;
use App\Http\Requests\Business\Users\ConfirmateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::prefix('business')->group(function () {
    Route::prefix('auth')->controller(BusinessAuthController::class)->group(function () {
        Route::post('/register', 'register');

        Route::post('/login', 'login');

        Route::get('/email/verify/{id}/{hash}', 'verify')->middleware(['signed'])->name('verification.verify');

        Route::post('/revalidate-email', 'revalidateEmail');

        Route::post('/logout', 'logout')->middleware('auth:sanctum');

        Route::get('/me', 'me')->middleware('auth:sanctum');
    });

    Route::prefix('customers')->controller(CustomerController::class)->middleware('auth:sanctum')->group(function () {
        Route::post('/', 'create');

        Route::get('/', 'get');

        Route::put('/{customer}', 'update');

        Route::delete('/{customerId}', 'deleteCustomerRelation');
    });

    Route::prefix('users')->controller(UserController::class)->middleware('auth:sanctum')->group(function () {
        Route::get('/', 'getUsers');

        Route::post('/', 'create');
    });
    
    Route::get('/user/complete-registration/{user}', function (Request $request, User $user) {
        return successResponse('Link válido', [
            'user' => $user->toResource()
        ]);
    })->middleware('signed')->name('user.complete-registration');

    Route::post('/user/complete-registration/{user}', function (ConfirmateUserRequest $request, User $user) {
        $validated = $request->validated(); 
        
        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => bcrypt($validated['password']),
        ]);
        
        // Marcar email como verificado
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return successResponse('Registro completado exitosamente');
    })->middleware('signed');
});
