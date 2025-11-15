<?php

use App\Models\Customer;
use Illuminate\Routing\Controller;

class CustomerController extends Controller {

  public function create(CreateCustomerRequest $request) {
    $validated = $request->validated();

    $customer = Customer::create([
      'first_name' => $validated['first_name'],
      'last_name' => $validated['last_name'] ?? null,
      'email' => $validated['email'] ?? null,
      'phone_number' => $validated['phone_number']
    ]);

    $customer->save();

    return successResponse('Cliente creado exitosamente', ['customer' => $customer], 201);
  }  

}