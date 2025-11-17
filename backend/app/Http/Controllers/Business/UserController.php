<?php

namespace App\Http\Controllers\Business;

use Illuminate\Routing\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller {
  public function getUsers(Request $request) {
    $user = $request->user();
    
    Gate::authorize('getUsers', $user);

    $users = User::whereBusinessId($user->business_id);

    return successResponse('Usuarios obtenidos con éxito', ['users' => UserResource::collection($users->get())]);
  }
}