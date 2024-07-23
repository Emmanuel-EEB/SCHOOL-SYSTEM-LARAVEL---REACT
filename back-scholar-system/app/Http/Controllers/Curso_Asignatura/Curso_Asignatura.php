<?php

namespace App\Http\Controllers\Curso_Asignatura;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;

class Curso_Asignatura extends Controller
{
    public function getAllCursoAsignatura()
    {
        // Obtener todos los cursos con sus asignaturas
        $cursos = Curso::with('asignaturas')->get();

        // Para cada curso, obtener las asignaturas relacionadas
        $data = [];
        foreach ($cursos as $curso) {
            $cursoData = [
                'id' => $curso->id,
                'curso' => $curso->codigo,
                'asignaturas' => $curso->asignaturas->pluck('nombre')->toArray(),
            ];
            $data[] = $cursoData;
        }

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function addAsignaturasToCurso(Request $request, $cursoId)
    {
        // Validar la entrada
        $request->validate([
            'asignaturas' => 'required|array',
            'asignaturas.*' => 'exists:asignaturas,id',
        ]);

        // Encontrar el curso por su código
        $curso = Curso::where('id', $cursoId)->firstOrFail();

        // Adjuntar las asignaturas al curso
        $curso->asignaturas()->syncWithoutDetaching($request->asignaturas);

        return response()->json([
            'success' => true,
            'message' => 'Asignaturas asignadas exitosamente al curso.',
        ]);
    }

    
}
