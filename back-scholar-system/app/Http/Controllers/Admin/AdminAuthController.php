<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        // Validación de los datos recibidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:admins,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Manejo de errores de validación
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Creación del nuevo usuario
        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Generación del token JWT para el nuevo usuario
        $token = Auth::guard('admin')->login($admin);

        return $this->respondWithToken($token);
    }

     // Método para iniciar sesión y obtener el token JWT
     public function login(Request $request)
     {
         // Validación de los datos recibidos
         $credentials = $request->only('email', 'password');
 
         if (! $token = Auth::guard('admin')->attempt($credentials)) {
             return response()->json(['error' => 'Unauthorized'], 401);
         }
 
         return $this->respondWithToken($token);
     }

     // Método para cerrar sesión
    public function logout()
    {
        Auth::guard('admin')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

     // Método para responder con el token JWT
     protected function respondWithToken($token)
     {
         return response()->json([
             'access_token' => $token,
             'token_type' => 'bearer',
             'expires_in' => Auth::guard('admin')->factory()->getTTL() * 60,
         ]);
     }
}
