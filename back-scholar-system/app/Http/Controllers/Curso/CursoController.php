<?php

namespace App\Http\Controllers\Curso;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CursoController extends Controller
{

// Método para obtener todos los estudiantes
public function getAllCursos()
{
    try {
        $cursos = Curso::all();
        return response()->json($cursos, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al obtener los cursos'], 500);
    }
}

// Método para registrar un nuevo Curso
public function register(Request $request)
{
    // Validación de los datos recibidos
    $validator = Validator::make($request->all(), [
        'codigo' => 'required|string|max:3|unique:cursos,codigo',
        'nombre' => 'required|string|max:255|unique:cursos,nombre',
    ]);

    // Manejo de errores de validación
    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    // Creación del nuevo curso
    $curso = Curso::create([
        'codigo' => $request->codigo, // Asegúrate de usar el campo correcto
        'nombre' => $request->nombre, // Asegúrate de usar el campo correcto
    ]);

    // Retornar un mensaje de éxito
    return response()->json(['message' => 'Registro exitoso', 'curso' => $curso], 201);
}

// Método para buscar un curso por código
public function buscarPorId($id)
{
    try {
        $curso = Curso::where('id', $id)->first();

        if (!$curso) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        return response()->json($curso, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al buscar el curso'], 500);
    }
}


}
