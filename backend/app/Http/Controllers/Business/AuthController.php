<?php

namespace App\Http\Controllers\Business;

use App\Enums\ErrorSubCode;
use App\Enums\Role;
use App\Models\Business;
use App\Models\LoyaltyConfig;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Business\Auth\PostRegisterRequest;
use App\Http\Requests\Business\Auth\PostLoginRequest;
use App\Http\Requests\Business\Auth\PostRevalidateEmailRequest;
use App\Http\Requests\Business\Users\ConfirmateUserRequest;
use Illuminate\Http\Request;

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
                'role' => Role::OWNER,
                'email' => $validated['email'],
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'password' => Hash::make($validated['password'])
            ]);
        });

        event(new Registered($user));

        return successResponse('Usuario registrado exitosamente', null, 201);
    }

    public function verify(string $id, string $hash): RedirectResponse
    {
        $user = User::findOrFail($id);

        $frontendUrl = config('app.frontend_url') . '/auth/verify';

        if (!$user) {
            $title = 'Ha ocurrido un error';
            $message = 'No hemos encontrado un usuario con el email especificado.';

            return redirect()->away($frontendUrl . '?success=false&title=' . urlencode($title) . '&message=' . urlencode($message));
        }

        $emailOk = hash_equals(sha1($user->getEmailForVerification()), $hash);

        if (!$emailOk) {
            $title = 'Ha ocurrido un error';
            $message = 'El enlace de verificación no es válido.';

            return redirect()->away($frontendUrl . '?success=false&title=' . urlencode($title) . '&message=' . urlencode($message));
        }

        if ($user->hasVerifiedEmail()) {
            $title = 'Correo ya verificado';
            $message = 'Su correo ya ha sido verificado anteriormente.';

            return redirect()->away($frontendUrl . '?success=false&title=' . urlencode($title) . '&message=' . urlencode($message));
        }

        $user->markEmailAsVerified();

        $title = 'Correo verificado';
        $message = 'Su correo ha sido verificado exitosamente.';

        return redirect()->away($frontendUrl . '?success=true&title=' . urlencode($title) . '&message=' . urlencode($message));
    }

    public function login(PostLoginRequest $request): JsonResponse {
        $validated = $request->validated();

        $user = User::whereEmail($validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            $title = 'Credenciales inválidas';
            $message = 'El email o la contraseña son incorrectos.';

            throwAppError($title, 401, ['title' => $title, 'message' => $message]);
        }

        if (!$user->hasVerifiedEmail()) {
            $title = 'Correo no verificado';
            $message = 'Por favor, verifique su correo antes de iniciar sesión.';

            throwAppError($title, 403, ['title' => $title, 'message' => $message], ErrorSubCode::MAIL_NOT_VERIFIED);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return successResponse("Autenticación exitosa", ['token' => $token]);
    }

    public function revalidateEmail(PostRevalidateEmailRequest $request): JsonResponse {
        $validated = $request->validated();

        $user = User::whereEmail($validated['email'])->first();

        if (!$user) {
            $title = 'Ha ocurrido un error';
            $message = 'No hemos encontrado un usuario con el email especificado.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        if ($user->hasVerifiedEmail()) {
            $title = 'Correo ya verificado';
            $message = 'Su correo ya ha sido verificado anteriormente.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        $user->sendEmailVerificationNotification();

        return successResponse('Correo de verificación reenviado exitosamente', null, 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return successResponse('Cierre de sesión exitoso');
    }
    
    public function me(Request $request): JsonResponse {
        $user = $request->user();

        return successResponse('Usuario autenticado obtenido exitosamente', ['user' => $user->toResource()]);
    
    }

    public function validateInvitationLink(User $user) {
        if (!$user) {
            $title = 'Enlace inválido';
            $message = 'El enlace de invitación no es válido.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        if ($user->email_verified_at !== null || $user->password !== null) {
            $title = 'Enlace inválido';
            $message = 'El enlace de invitación ya ha sido utilizado.';

            throwAppError($title, 400, ['title' => $title, 'message' => $message]);
        }

        return successResponse('Link válido', [
            'user' => $user->toResource()
        ]);
    }

    public function completeRegistration(ConfirmateUserRequest $request, User $user): JsonResponse {
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
    }

}
