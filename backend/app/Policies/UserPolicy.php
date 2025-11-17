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
        return in_array($user->role, [Role::OWNER->value, Role::ADMIN->value]);
    }

    public function createUser(User $user): bool {
        return in_array($user->role, [Role::OWNER->value, Role::ADMIN->value]);
    }

    public function deleteUser(User $user): bool {
        return in_array($user->role, [Role::OWNER->value]);
    }

    public function updateUser(User $user): bool {
        return in_array($user->role, [Role::OWNER->value]);
    }
}
