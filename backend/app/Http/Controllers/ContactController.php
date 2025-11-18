<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateContactRequest;
use App\Models\Contact;
use Illuminate\Routing\Controller;

class ContactController extends Controller
{
    public function create(CreateContactRequest $request)
    {
        $validatedData = $request->validated();

        Contact::create($validatedData);

        return successResponse('Contacto creado exitosamente.', null, 201);
    }
}
