<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function getUsers(User $user): bool {
        Log::info('User role', ['role' => $user->role]);
        Log::info(in_array($user->role, [Role::OWNER, Role::ADMIN]) ? 'Role is authorized' : 'Role is not authorized');
        Log::info('Authorized roles', ['roles' => [Role::OWNER, Role::ADMIN]]);

        return in_array($user->role, [Role::OWNER->value, Role::ADMIN->value]);
    }

    public function createUser(User $user): bool {
        return in_array($user->role, [Role::OWNER->value, Role::ADMIN->value]);
    }

}
