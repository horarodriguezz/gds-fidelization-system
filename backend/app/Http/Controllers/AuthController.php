<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\Auth\PostRegisterRequest;
use App\Models\Business;
use App\Models\LoyaltyConfig;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(PostRegisterRequest $request): JsonResponse {
        $validated = $request->validated();

        $user = DB::transaction(function() use ($validated) {
            $business = Business::create(['name' => $validated['business_name']]);

            LoyaltyConfig::create(['business_id' => $business->id]);

            return User::create([
                'business_id' => $business['id'],
                'role' => Role::ADMIN,
                'email' => $validated['email'],
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'password' => Hash::make($validated['password'])
            ]);
        });

        event(new Registered($user));

        return successResponse('Usuario registrado exitosamente');
    }
}
