<?php

namespace App\Http\Controllers\Business;

use App\Http\Requests\Business\Customers\CreateCustomerRequest;
use App\Http\Requests\Business\Customers\GetPaginatedCustomersRequest;
use App\Http\Requests\Business\Customers\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\CustomerBusiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller {

  public function create(CreateCustomerRequest $request): JsonResponse {
    $validated = $request->validated();

    $user = $request->user();
    $phone_number = phone($validated['phone_number'], 'AR', 'INTERNATIONAL');

    $customer = Customer::wherePhoneNumber($phone_number)->first();

    if ($customer) {
      $customerBusiness = CustomerBusiness::whereCustomerId($customer->id)
        ->whereBusinessId($user->business_id)
        ->first();

      if ($customerBusiness && $customerBusiness->deleted_at === null) {
        throwAppError('El número de teléfono pertenece a un cliente ya registrado.', 400, [
          'customer' => $customerBusiness->customer->toResource()
        ]);
      } 

      if ($customerBusiness && $customerBusiness->deleted_at !== null) {
        $customerBusiness->restore();

        return successResponse('Cliente creado exitosamente', ['customer' => $customer->toResource()], 201);
      }

      $customerBusiness = DB::transaction(function () use ($customer, $user) {
        CustomerBusiness::create([
          'business_id' => $user->business_id,
          'customer_id' => $customer->id,
          'cached_points' => 0
        ]);
      });

      return successResponse('Cliente creado exitosamente', ['customer' => $customer->toResource()], 201);
    }

    $customer = DB::transaction(function () use ($validated, $phone_number, $user) {
      $customer = Customer::create([
        'first_name' => $validated['first_name'],
        'last_name' => $validated['last_name'] ?? null,
        'email' => $validated['email'] ?? null,
        'phone_number' => $phone_number
      ]);

      CustomerBusiness::create([
        'business_id' => $user->business_id,
        'customer_id' => $customer->id,
        'cached_points' => 0
      ]);

      return $customer;
    });


    return successResponse('Cliente creado exitosamente', ['customer' => $customer], 201);
  }  

  public function get(GetPaginatedCustomersRequest $request) {
    $validated = $request->validated();

    $page = $validated['page'] ?? 1;
    $perPage = $validated['per_page'] ?? 10;
    $search = $validated['search'] ?? null;
    $lastVisitedAfter = $validated['last_visited_after'] ?? null;
    $lastVisitedBefore = $validated['last_visited_before'] ?? null;

    $query = Customer::query();

    $query->whereDeletedAt(null);

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

  public function delete(Customer $customer): JsonResponse {
    $customer->delete();

    return successResponse('Cliente eliminado exitosamente', null);
  }
}