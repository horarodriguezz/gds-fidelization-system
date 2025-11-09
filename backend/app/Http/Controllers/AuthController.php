<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\Auth\PostRegisterRequest;
use App\Models\Business;
use App\Models\LoyaltyConfig;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    public function register(PostRegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
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

        return successResponse('Usuario registrado exitosamente', null, 201);
    }

    public function verify(string $id, string $hash): JsonResponse
    {
        $user = User::findOrFail($id);

        if (!$user) {
            $title = 'Ha ocurrido un error';
            $message = 'No hemos encontrado un usuario con el email especificado.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        $emailOk = hash_equals(sha1($user->getEmailForVerification()), $hash);

        if (!$emailOk) {
            $title = 'Ha ocurrido un error';
            $message = 'El enlace de verificación no es válido.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        if ($user->hasVerifiedEmail()) {
            $title = 'Correo ya verificado';
            $message = 'Su correo ya ha sido verificado anteriormente.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        $user->markEmailAsVerified();

        $title = 'Correo verificado';
        $message = 'Su correo ha sido verificado exitosamente.';

        return successResponse($title, ['title' => $title, 'message' => $message]);
    }
}
