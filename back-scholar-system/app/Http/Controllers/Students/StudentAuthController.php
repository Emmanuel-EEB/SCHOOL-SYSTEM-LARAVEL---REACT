<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class StudentAuthController extends Controller
{
    // Método para obtener todos los estudiantes
    public function getAllStudents()
    {
        try {
            $students = Student::all();
            return response()->json($students, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los estudiantes'], 500);
        }
    }

    // Método para registrar un nuevo usuario
    public function register(Request $request)
{
    // Validación de los datos recibidos
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'rut' => 'required|string|max:15|unique:students,rut',
        'email' => 'required|string|email|unique:students,email',
        'password' => 'required|string|min:6|confirmed',
        'curso_id' => 'nullable', // Asegura que el curso_id existe en la tabla cursos
    ]);

    // Manejo de errores de validación
    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    try {
        // Creación del nuevo estudiante
        $student = Student::create([
            'name' => $request->name,
            'rut' => $request->rut,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'curso_id' => $request->curso_id, // Asignación del curso_id recibido
        ]);

        // Retorna una respuesta exitosa con el token JWT generado
        $token = Auth::guard('student')->login($student);
        return $this->respondWithToken($token);
    } catch (\Exception $e) {
        // Captura cualquier excepción y retorna un error genérico
        return response()->json(['error' => 'Error al crear el estudiante'], 500);
    }
}


     // Método para iniciar sesión y obtener el token JWT
     public function login(Request $request)
     {
         // Validación de los datos recibidos
         $credentials = $request->only('email', 'password');
 
         if (! $token = Auth::guard('student')->attempt($credentials)) {
             return response()->json(['error' => 'Unauthorized'], 401);
         }
 
         return $this->respondWithToken($token);
     }

     // Método para cerrar sesión
    public function logout()
    {
        Auth::guard('student')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

     // Método para responder con el token JWT
     protected function respondWithToken($token)
     {
         return response()->json([
             'access_token' => $token,
             'token_type' => 'bearer',
             'expires_in' => Auth::guard('student')->factory()->getTTL() * 60,
         ]);
     }
}
