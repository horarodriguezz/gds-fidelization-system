<?php

use App\Exceptions\AppException;

if (!function_exists('throwAppError')) {
    /**
     * Lanza una excepción de aplicación con un formato consistente.
     *
     * @param string $message  Mensaje descriptivo del error.
     * @param int $code        Código HTTP (ej: 400, 401, 404...).
     * @param array|null $data Datos adicionales opcionales.
     *
     * @throws AppException
     */
    function throwAppError(string $message, int $code = 400, ?array $data = null): void
    {
        throw new AppException($message, $code, $data);
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
            'code' => $code,
            'data' => $data,
        ], $code);
    }
}
