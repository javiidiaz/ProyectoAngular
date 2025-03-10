<?php
 use App\Http\Controllers\CocheController;
 use Illuminate\Support\Facades\Route;
 use Illuminate\Http\Request;

    // Obtener todos los coches
    Route::get('/coches', [CocheController::class, 'index']);

    // Obtener un coche por ID
    Route::get('/coches/{id}', [CocheController::class, 'show']);

    // Crear un nuevo coche
    Route::post('/coches', [CocheController::class, 'store']);

    // Actualizar un coche por ID
    Route::put('/coches/{id}', [CocheController::class, 'update']);

    // Eliminar un coche por ID
    Route::delete('/coches/{id}', [CocheController::class, 'destroy']);
