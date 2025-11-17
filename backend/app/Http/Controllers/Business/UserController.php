<?php

namespace App\Http\Controllers\Business;

use App\Http\Requests\Business\Users\CreateUserRequest;
use App\Http\Requests\Business\Users\UpdateUserRequest;
use Illuminate\Routing\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller {
  public function getUsers(Request $request) {
    $user = $request->user();
    
    Gate::authorize('getUsers', $user);

    $users = User::whereBusinessId($user->business_id);

    return successResponse('Usuarios obtenidos con éxito', ['users' => UserResource::collection($users->get())]);
  }

  public function create(CreateUserRequest $request) {
    $user = $request->user();

    Gate::authorize('createUser', $user);

    $validated = $request->validated();

    $newUser = User::create([
      'business_id' => $user->business_id,
      'first_name' => $validated['first_name'],
      'last_name' => $validated['last_name'] ?? null,
      'email' => $validated['email'],
      'phone_number' => $validated['phone_number'] ?? null,
      'role' => $validated['role']
    ]);

    Mail::to($newUser->email)->send(new \App\Mail\UserInvitation($newUser));

    return successResponse('Usuario creado exitosamente', ['user' => $newUser->toResource()], 201);
  }

  public function delete(Request $request, string $userId) {
    $user = $request->user();

    Gate::authorize('deleteUser', $user);

    $userToDelete = User::whereBusinessId($user->business_id)->whereId($userId)->firstOrFail();
    $userToDelete->delete();

    return successResponse('Usuario eliminado exitosamente');
  }

  public function update(UpdateUserRequest $request, User $user) {
    $authUser = $request->user();

    Gate::authorize('updateUser', $authUser);

    $validated = $request->validated();

    $user->update([
      'first_name' => $validated['first_name'] ?? $user->first_name,
      'last_name' => $validated['last_name'] ?? $user->last_name,
      'phone_number' => $validated['phone_number'] ?? $user->phone_number,
      'role' => $validated['role'] ?? $user->role
    ]);

    return successResponse('Usuario actualizado exitosamente', ['user' => $user->toResource()]);
  }
}