<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function updateStudentCurso($id, Request $request)
    {
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json(['error' => 'Estudiante no encontrado'], 404);
        }

        $student->curso_id = $request->input('curso_id');
        $student->save();

        return response()->json(['success' => 'Curso asignado correctamente']);
    }
}
