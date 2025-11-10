<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\JsonResponse;
use App\Exceptions\AppException;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $e): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $e->getMessage()
        ];

        if ($e instanceof \Illuminate\Validation\ValidationException) {
            $response['message'] = 'Error de validación';
            $response['data'] = $e->errors();
        }

        if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            $response['message'] = 'Recurso no encontrado';
        }

        if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            $response['message'] = 'Ruta no encontrada';
        }

        if ($e instanceof AppException) {
            $response['subcode'] = $e->subcode;

            if ($e->data !== null) {
                $response['data'] = $e->data;
            }
        }

        // 🧱 Respuesta genérica
        return response()->json($response, $e->getCode() ?: 400);
    }
}
