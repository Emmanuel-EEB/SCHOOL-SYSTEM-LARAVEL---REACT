<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TeacherAuthController extends Controller
{
    // Método para obtener todos los estudiantes
    public function getAllDocentes()
    {
        try {
            $cursos = Teacher::all();
            return response()->json($cursos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los docentes'], 500);
        }
    }

    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        // Validación de los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'rut' => 'required|string|unique:teachers,rut',
            'email' => 'required|string|email|unique:teachers,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Manejo de errores de validación
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Creación del nuevo usuario
        $teacher = Teacher::create([
            'name' => $request->name,
            'rut' => $request->rut,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Generación del token JWT para el nuevo usuario
        $token = Auth::guard('teacher')->login($teacher);

        return $this->respondWithToken($token);
    }

     // Método para iniciar sesión y obtener el token JWT
     public function login(Request $request)
     {
         // Validación de los datos recibidos
         $credentials = $request->only('email', 'password');
 
         if (! $token = Auth::guard('teacher')->attempt($credentials)) {
             return response()->json(['error' => 'Unauthorized'], 401);
         }
 
         return $this->respondWithToken($token);
     }

     // Método para cerrar sesión
    public function logout()
    {
        Auth::guard('teacher')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

     // Método para responder con el token JWT
     protected function respondWithToken($token)
     {
         return response()->json([
             'access_token' => $token,
             'token_type' => 'bearer',
             'expires_in' => Auth::guard('teacher')->factory()->getTTL() * 60,
         ]);
     }
}
