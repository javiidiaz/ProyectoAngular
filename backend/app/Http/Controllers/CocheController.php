<?php

namespace App\Http\Controllers;

use App\Models\Coche;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CocheController extends Controller
{

    // Obtener todos los coches
    public function index()
    {
        return response()->json(Coche::all(), 200);
    }


    // Obtener un coche por ID
    public function show($id)
    {
        $coche = Coche::find($id);

        if (!$coche) {
            return response()->json(['error' => 'Coche no encontrado'], 404);
        }
        return response()->json($coche, 200);
    }


    // Crear un coche
    public function store(Request $request)
    {
        $request->validate([
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'anio' => 'required|integer|min:1900|max:' . date('Y'),
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Guardar la imagen si se envía
        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('coches', 'public');
        }

        $coche = Coche::create([
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'anio' => $request->anio,
            'precio' => $request->precio,
            'imagen' => $imagenPath,
        ]);

        return response()->json($coche, 201);
    }

    // Actualizar un coche
    public function update(Request $request, $id)
    {
        $coche = Coche::find($id);
        if (!$coche) {
            return response()->json(['error' => 'Coche no encontrado'], 404);
        }

        $request->validate([
            'marca' => 'sometimes|string|max:255',
            'modelo' => 'sometimes|string|max:255',
            'anio' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'precio' => 'sometimes|numeric|min:0',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Si hay una nueva imagen, la guardamos
        if ($request->hasFile('imagen')) {
            // Eliminar la imagen anterior si existe
            if ($coche->imagen && Storage::exists('public/' . $coche->imagen)) {
                Storage::delete('public/' . $coche->imagen);
            }
            $coche->imagen = $request->file('imagen')->store('coches', 'public');
        }

        $coche->marca = $request->marca ?? $coche->marca;
        $coche->modelo = $request->modelo ?? $coche->modelo;
        $coche->anio = $request->anio ?? $coche->anio;
        $coche->precio = $request->precio ?? $coche->precio;
        $coche->save();

        return response()->json($coche, 200);
    }

    // Eliminar un coche
    public function destroy($id)
    {
        $coche = Coche::find($id);
        if (!$coche) {
            return response()->json(['error' => 'Coche no encontrado'], 404);
        }

        // Eliminar la imagen del coche
        if ($coche->imagen && Storage::exists('public/' . $coche->imagen)) {
            Storage::delete('public/' . $coche->imagen);
        }

        $coche->delete();

        return response()->json(['message' => 'Coche eliminado'], 200);
    }
}
