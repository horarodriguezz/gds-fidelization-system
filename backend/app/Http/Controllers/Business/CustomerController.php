<?php

namespace App\Http\Controllers\Business;

use App\Http\Requests\Business\Customers\CreateCustomerRequest;
use App\Http\Requests\Business\Customers\GetPaginatedCustomersRequest;
use App\Http\Requests\Business\Customers\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller {

  public function createCustomer(CreateCustomerRequest $request): JsonResponse {
    $validated = $request->validated();

    Log::info('Creating customer with data: ', $validated);

    $phone_number = phone($validated['phone_number'], 'AR', 'INTERNATIONAL');

    $customer = Customer::create([
      'first_name' => $validated['first_name'],
      'last_name' => $validated['last_name'] ?? null,
      'email' => $validated['email'] ?? null,
      'phone_number' => $phone_number
    ]);

    return successResponse('Cliente creado exitosamente', ['customer' => $customer], 201);
  }  

  public function getPaginated(GetPaginatedCustomersRequest $request) {
    $validated = $request->validated();

    $page = $validated['page'] ?? 1;
    $perPage = $validated['per_page'] ?? 10;
    $search = $validated['search'] ?? null;
    $lastVisitedAfter = $validated['last_visited_after'] ?? null;
    $lastVisitedBefore = $validated['last_visited_before'] ?? null;

    $query = Customer::query();

    if ($search) {
      $query->where(function ($q) use ($search) {
        $q->where('first_name', 'like', '%' . $search . '%')
          ->orWhere('last_name', 'like', '%' . $search . '%')
          ->orWhere('email', 'like', '%' . $search . '%')
          ->orWhere('phone_number', 'like', '%' . $search . '%');
      });
    }

    if ($lastVisitedAfter) {
      $query->where('last_visited_at', '>=', $lastVisitedAfter);
    }

    if ($lastVisitedBefore) {
      $query->where('last_visited_at', '<=', $lastVisitedBefore);
    }

    $customers = $query->paginate($perPage, ['*'], 'page', $page);

    return paginatedResponse('Clientes obtenidos exitosamente', $customers);
  }

  public function update(UpdateCustomerRequest $request, Customer $customer): JsonResponse {
    $validated = $request->validated();

    $wantToUpdatePhoneNumber = isset($validated['phone_number']);

    /**
     * If the customer has already validated their phone number, only him can update it
     */
    if ($wantToUpdatePhoneNumber && $customer->isAlreadyValidated()) {
      throwAppError('No puedes modificar el número de teléfono de un cliente que se ha registrado en la aplicación.', 400, [
        'customer_id' => $customer->id,
        'phone_number' => $customer->phone_number
      ]);
    } elseif ($wantToUpdatePhoneNumber) {
      $phone_number = phone($validated['phone_number'], 'AR', 'INTERNATIONAL');
      $customer->phone_number = $phone_number;
    }

    if (isset($validated['first_name'])) {
      $customer->first_name = $validated['first_name'];
    }

    if (isset($validated['last_name'])) {
      $customer->last_name = $validated['last_name'];
    }

    if (isset($validated['email'])) {
      $customer->email = $validated['email'];
    }

    $customer->save();

    return successResponse('Cliente actualizado exitosamente', ['customer' => $customer]);
  }
}