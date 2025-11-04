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
            'message' => $e->getMessage(),
            'code' => method_exists($e, 'getStatusCode')
                ? $e->getStatusCode()
                : 500,
        ];

        if ($e instanceof \Illuminate\Validation\ValidationException) {
            $response['message'] = 'Error de validación';
            $response['data'] = $e->errors();
            $response['code'] = 422;
        }

        if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            $response['message'] = 'Recurso no encontrado';
            $response['code'] = 404;
        }

        if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            $response['message'] = 'Ruta no encontrada';
            $response['code'] = 404;
        }

        if ($e instanceof AppException) {
            $response['code'] = $e->getCode();

            if ($e->data !== null) {
                $response['data'] = $e->data;
            }
        }

        // 🧱 Respuesta genérica
        return response()->json($response, $response['code']);
    }
}
