<?php

use App\Http\Controllers\CocheController;
use Illuminate\Support\Facades\Route;

Route::get('/coches', [CocheController::class, 'index'])->name('coches.index'); // Mostrar todos los coches
Route::get('/coches/{id}', [CocheController::class, 'show'])->name('coches.show'); // Ver detalles de un coche por ID
Route::post('/coches', [CocheController::class, 'store'])->name('coches.store'); // Crear un coche
Route::put('/coches/{id}', [CocheController::class, 'update'])->name('coches.update'); // Actualizar un coche
Route::delete('/coches/{id}', [CocheController::class, 'destroy'])->name('coches.destroy'); // Eliminar un coche
