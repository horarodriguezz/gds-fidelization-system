<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\JsonResponse;
use App\Exceptions\AppException;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $exception->getMessage(),
            'code' => method_exists($exception, 'getStatusCode')
                ? $exception->getStatusCode()
                : 500,
        ];

        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $response['message'] = 'Error de validación';
            $response['errors'] = $exception->errors();
            $response['code'] = 422;
        }

        if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            $response['message'] = 'Recurso no encontrado';
            $response['code'] = 404;
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            $response['message'] = 'Ruta no encontrada';
            $response['code'] = 404;
        }

        if ($exception instanceof AppException) {
            $response['code'] = $exception->getCode();

            if ($exception->data !== null) {
                $response['data'] = $exception->data;
            }
        }

        // 🧱 Respuesta genérica
        return response()->json($response, $response['code']);
    }
}
