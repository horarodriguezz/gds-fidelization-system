<?php

namespace App\Rules;

use App\Models\Customer;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class ExistingCustomerWithPhone implements ValidationRule
{
    protected $exceptCustomerId = null;

    public function except(string $customerId): static 
    {
        $this->exceptCustomerId = $customerId;
        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        
        $parsedNumber = phone($value, 'AR', 'INTERNATIONAL');

        $query = Customer::where('phone_number', $parsedNumber);

        if ($this->exceptCustomerId) {
            $query->where('id', '!=', $this->exceptCustomerId);
        }

        $existingCustomer = $query->first();

        if ($existingCustomer && $existingCustomer->deleted_at === null) {
            $fail('El número de teléfono pertenece a un cliente ya registrado.');
        }
    }


}
