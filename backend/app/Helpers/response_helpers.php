<?php

use App\Enums\ErrorSubCode;
use App\Exceptions\AppException;
use Illuminate\Pagination\LengthAwarePaginator;

if (!function_exists('throwAppError')) {
    /**
     * Lanza una excepción de aplicación con un formato consistente.
     *
     * @param string $message  Mensaje descriptivo del error.
     * @param int $code        Código HTTP (ej: 400, 401, 404...).
     * @param array|null $data Datos adicionales opcionales.
     * @param ErrorSubCode|null $subcode Código de suberror opcional.
     * 
     * @throws AppException
     */
    function throwAppError(string $message, int $code = 400, ?array $data = null, ?ErrorSubCode $subcode = null): void
    {
        throw new AppException($message, $code, $data, $subcode);
    }
}

if (!function_exists('successResponse')) {
    /**
     * Devuelve una respuesta JSON de éxito con formato estándar.
     *
     * @param string|null $message  Mensaje descriptivo.
     * @param array|null $data Datos opcionales.
     * @param int $code        Código HTTP (por defecto 200).
     */
    function successResponse(?string $message, ?array $data = null, int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'status' => $code,
            'data' => $data,
        ], $code);
    }
}

if (!function_exists('paginatedResponse')) {
    /**
     * Devuelve una respuesta JSON paginada con formato estándar.
     *
     * @param string|null $message  Mensaje descriptivo.
     * @param LengthAwarePaginator $paginator Paginador de datos.
     * @param int $code        Código HTTP (por defecto 200).
     */
    function paginatedResponse(?string $message, LengthAwarePaginator $paginator, ?int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'status' => $code,
            'data' => method_exists($paginator, 'toResourceCollection') 
                ? $paginator->toResourceCollection() 
                : $paginator->items(),
            'pagination' => [
                'total' => $paginator->total(),
                'perPage' => $paginator->perPage(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'hasNextPage' => $paginator->hasMorePages(),
                'hasPreviousPage' => $paginator->currentPage() > 1
            ],
        ], $code);
    }
}
