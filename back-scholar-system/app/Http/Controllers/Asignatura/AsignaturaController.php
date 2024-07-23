<?php

namespace App\Http\Controllers\Asignatura;

use App\Http\Controllers\Controller;
use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AsignaturaController extends Controller
{
    /// Método para obtener todos los estudiantes
    public function getAllAsignatura()
    {
        try {
            $asignaturas = Asignatura::all();
            return response()->json($asignaturas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las Asignaturas'], 500);
        }
    }

    // Método para registrar un nuevo Curso
    public function register(Request $request)
    {
        // Validación de los datos recibidos
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255|unique:asignaturas,nombre',
        ]);

        // Manejo de errores de validación
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Creación de la asignatura
        $asignatura = Asignatura::create([
            'nombre' => $request->nombre, // Asegúrate de usar el campo correcto
        ]);

        // Retornar un mensaje de éxito
        return response()->json(['message' => 'Registro exitoso', 'asignatura' => $asignatura], 201);
    }
    
}
