<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'students' => 'required|array',
        ]);

        try {
            foreach ($request->students as $row) {
                Student::create([
                    'name' => $row['name'],
                    'rut' => $row['rut'],
                    'email' => $row['email'],
                    'password' => bcrypt($row['rut']),
                ]);
            }

            return response()->json(['message' => 'Estudiantes cargados correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al cargar los estudiantes: ' . $e->getMessage()], 500);
        }
    }
}
