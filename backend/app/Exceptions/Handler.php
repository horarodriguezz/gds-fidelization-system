<?php
namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler
{
    /**
     * Map of exception classes to their handler methods
     */
    public static array $handlers = [
        AuthenticationException::class => 'handleAuthenticationException',
        AccessDeniedHttpException::class => 'handleAuthenticationException',
        AuthorizationException::class => 'handleAuthorizationException',
        ValidationException::class => 'handleValidationException',
        ModelNotFoundException::class => 'handleNotFoundException',
        NotFoundHttpException::class => 'handleNotFoundException',
        MethodNotAllowedHttpException::class => 'handleMethodNotAllowedException',
        HttpException::class => 'handleHttpException',
        QueryException::class => 'handleQueryException',
        AppException::class => 'handleAppException',
    ];

    /**
     * Handle authentication exceptions
     */
    public function handleAuthenticationException(
        AuthenticationException|AccessDeniedHttpException $e, 
        Request $request
    ): JsonResponse {
        $this->logException($e, 'Autenticación fallida');

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => 401,
            'message' => 'Autenticación requerida. Por favor proporcione credenciales válidas.',
            'timestamp' => now()->toISOString(),
        ], 401);
    }

    /**
     * Handle authorization exceptions
     */
    public function handleAuthorizationException(
        AuthorizationException $e, 
        Request $request
    ): JsonResponse {
        $this->logException($e, 'Autorización fallida');

        return response()->json([
                'type' => $this->getExceptionType($e),
                'status' => 403,
                'message' => 'No tiene permiso para realizar esta acción.',
                'timestamp' => now()->toISOString(),
        ], 403);
    }

    /**
     * Handle validation exceptions
     */
    public function handleValidationException(
        ValidationException $e, 
        Request $request
    ): JsonResponse {
        $errors = [];
        
        foreach ($e->errors() as $field => $messages) {
            foreach ($messages as $message) {
                $errors[] = [
                    'field' => $field,
                    'message' => $message,
                ];
            }
        }

        $this->logException($e, 'Validación fallida', ['errors' => $errors]);

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => 422,
            'message' => 'Los datos proporcionados son inválidos.',
            'timestamp' => now()->toISOString(),
            'data' => ['errors' => $errors],
        ], 422);
    }

    /**
     * Handle not found exceptions
     */
    public function handleNotFoundException(
        ModelNotFoundException|NotFoundHttpException $e, 
        Request $request
    ): JsonResponse {
        $this->logException($e, 'Recurso no encontrado');

        $message = $e instanceof ModelNotFoundException 
            ? 'El recurso solicitado no fue encontrado.'
            : "La ruta solicitada '{$request->getRequestUri()}' no fue encontrada.";

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => 404,
            'message' => $message,
            'timestamp' => now()->toISOString(),
        ], 404);
    }

    /**
     * Handle method not allowed exceptions
     */
    public function handleMethodNotAllowedException(
        MethodNotAllowedHttpException $e, 
        Request $request
    ): JsonResponse {
        $this->logException($e, 'Método no permitido');

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => 405,
            'message' => "El método {$request->method()} no está permitido para este endpoint.",
            'timestamp' => now()->toISOString(),
            'data' => [
                'allowed_methods' => $e->getHeaders()['Allow'] ?? 'Desconocido'
            ],
        ], 405);
    }

    /**
     * Handle general HTTP exceptions
     */
    public function handleHttpException(HttpException $e, Request $request): JsonResponse
    {
        $this->logException($e, 'Excepción HTTP');

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => $e->getStatusCode(),
            'message' => $e->getMessage() ?: 'Ocurrió un error HTTP.',
            'timestamp' => now()->toISOString(),
        ], $e->getStatusCode());
    }

    /**
     * Handle database query exceptions
     */
    public function handleQueryException(QueryException $e, Request $request): JsonResponse
    {
        $this->logException($e, 'Consulta a la base de datos fallida', ['sql' => $e->getSql()]);

        // Handle specific database constraint violations
        $errorCode = $e->errorInfo[1] ?? null;
        
        switch ($errorCode) {
            case 1451: // Foreign key constraint violation
                return response()->json([
                    'type' => $this->getExceptionType($e),
                    'status' => 409,
                    'message' => 'No se puede eliminar este recurso porque está referenciado por otros registros.',
                    'timestamp' => now()->toISOString(),
                ], 409);
                
            case 1062: // Duplicate entry
                return response()->json([
                        'type' => $this->getExceptionType($e),
                        'status' => 409,
                        'message' => 'Ya existe un registro con esta información.',
                        'timestamp' => now()->toISOString(),
                ], 409);
                
            default:
                return response()->json([
                        'type' => $this->getExceptionType($e),
                        'status' => 500,
                        'message' => 'Ocurrió un error en la base de datos. Por favor, inténtelo de nuevo más tarde.',
                        'timestamp' => now()->toISOString(),
                ], 500);
        }
    }

    /**
     * Handle application-specific exceptions
     */
    public function handleAppException(
        AppException $e, 
        Request $request
    ): JsonResponse {
        $this->logException($e, 'Error', [
            'subcode' => $e->subcode,
            'data' => $e->data,
        ]);

        $code = $e->getCode();

        return response()->json([
            'type' => $this->getExceptionType($e),
            'status' => $code,
            'message' => $e->getMessage(),
            'timestamp' => now()->toISOString(),
            'subcode' => $e->subcode,
            'data' => $e->data,
        ], $code);
    }

    /**
     * Extract a clean exception type name
     */
    private function getExceptionType(Throwable $e): string
    {
        $className = basename(str_replace('\\', '/', get_class($e)));
        return $className;
    }

    /**
     * Log exception with context
     */
    private function logException(Throwable $e, string $message, array $context = []): void
    {
        $logContext = array_merge([
            'exception' => get_class($e),
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'url' => request()->fullUrl(),
            'method' => request()->method(),
            'ip' => request()->ip(),
        ], $context);

        Log::warning($message, $logContext);
    }
}