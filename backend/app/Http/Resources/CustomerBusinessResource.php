<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerBusinessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "customer" => new CustomerResource($this->whenLoaded('customer')),
            "customer_id" => $this->when(!$this->relationLoaded('customer'), $this->customer_id),
            "business_id" => $this->business_id,
            "created_at" => $this->created_at,
            "last_visit_at" => $this->updated_at,
            "cached_points" => $this->cached_points
        ];
    }
}
