<?php

namespace App\Http\Controllers\Teacher_Asignatura;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;

class Teacher_Asignatura extends Controller
{
    public function getAllTeacherAsignatura()
    {
        // Obtener todos los profesores con sus asignaturas
        $teachers = Teacher::with('asignaturas')->get();

        // Para cada profesor, obtener las asignaturas relacionadas
        $data = [];
        foreach ($teachers as $teacher) {
            $teacherData = [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'asignaturas' => $teacher->asignaturas->pluck('nombre')->toArray(),
            ];
            $data[] = $teacherData;
        }

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function addAsignaturasToTeacher(Request $request, $teacherId)
    {
        // Validar la entrada
        $request->validate([
            'asignaturas' => 'required|array',
            'asignaturas.*' => 'exists:asignaturas,id',
        ]);

        // Encontrar el profesor por su ID
        $teacher = Teacher::where('id', $teacherId)->firstOrFail();

        // Adjuntar las asignaturas al profesor
        $teacher->asignaturas()->syncWithoutDetaching($request->asignaturas);

        return response()->json([
            'success' => true,
            'message' => 'Asignaturas asignadas exitosamente al profesor.',
        ]);
    }
}
