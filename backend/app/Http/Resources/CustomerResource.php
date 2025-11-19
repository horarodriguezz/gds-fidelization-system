<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "email" => $this->email,
            "phoneNumber" => $this->phone_number,
            "profilePicture" => $this->profile_picture,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at,
            "isValidated" => $this->phone_validated_at !== null,
        ];
    }
}
