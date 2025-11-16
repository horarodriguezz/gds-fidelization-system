<?php

namespace App\Http\Controllers\Business;

use App\Http\Requests\Business\Customers\CreateCustomerRequest;
use App\Http\Requests\Business\Customers\GetPaginatedCustomersRequest;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller {

  public function createCustomer(CreateCustomerRequest $request): JsonResponse {
    $validated = $request->validated();

    Log::info('Creating customer with data: ', $validated);

    $customer = Customer::create([
      'first_name' => $validated['first_name'],
      'last_name' => $validated['last_name'] ?? null,
      'email' => $validated['email'] ?? null,
      'phone_number' => $validated['phone_number']
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
}