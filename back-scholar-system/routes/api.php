<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Asignatura\AsignaturaController;
use App\Http\Controllers\Curso\CursoController;
use App\Http\Controllers\Curso_Asignatura\Curso_Asignatura;
use App\Http\Controllers\Students\StudentAuthController;
use App\Http\Controllers\Students\StudentController;
use App\Http\Controllers\Students\StudentImportController;
use App\Http\Controllers\Teacher\TeacherAuthController;
use App\Http\Controllers\Teacher_Asignatura\Teacher_Asignatura;
use App\Http\Controllers\User\AuthUserController;
use Illuminate\Support\Facades\Route;





Route::prefix('user')->group(function () {
    Route::post('/register',[AuthUserController::class,'register']);
    Route::post('/login',[AuthUserController::class,'login']);
    Route::post('/logout',[AuthUserController::class,'logout'])->middleware('auth:user');
});

Route::prefix('admin')->group(function () {
    //IMPORT STUDENTS
    Route::post('/upload-students', [StudentImportController::class, 'import']);
    //Registrar al estudiante,Todos los estudiantes
    Route::post('/registerst', [StudentAuthController::class, 'register']);
    Route::get('/allstudents', [StudentAuthController::class, 'getAllStudents']);
    //Registro,login,logout
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth:admin');
    //Registrar Curso,Todos los Cursos,Buscar Curso por codigo
    Route::post('/register-curso', [CursoController::class, 'register']);
    Route::get('/allcursos', [CursoController::class, 'getAllCursos']);
    Route::get('/curso/{id}', [CursoController::class, 'buscarPorId']);
    Route::put('/updateStudentCurso/{id}', [StudentController::class, 'updateStudentCurso']);

    //Registrar Docente
    Route::post('/registerdc', [TeacherAuthController::class, 'register']);
    Route::get('/alldocentes', [TeacherAuthController::class, 'getAllDocentes']);
    //Agregarle asignaturas a un docente
    Route::post('/teachers/{teacherId}/asignaturas', [Teacher_Asignatura::class, 'addAsignaturasToTeacher']);
    //ALL ASIGNATURAS
    Route::get('/allasignaturas', [AsignaturaController::class, 'getAllAsignatura']);
    //agregar asignatura a un curso
    Route::post('/{cursoId}/asignaturas', [Curso_Asignatura::class, 'addAsignaturasToCurso']);
    //registrar asignatura   
    Route::post('/registeras', [AsignaturaController::class, 'register']);   
    //Totods los cursos con sus asignaturas
    Route::get('/curso-asignatura', [Curso_Asignatura::class, 'getAllCursoAsignatura']);
    //todos los docentes con sus asignaturas
    Route::get('/teacher-asignatura', [Teacher_Asignatura::class, 'getAllTeacherAsignatura']);
   
 
});

Route::prefix('teacher')->group(function () {
    Route::post('/register', [TeacherAuthController::class, 'register']);
    Route::post('/login', [TeacherAuthController::class, 'login']);
    Route::post('/logout', [TeacherAuthController::class, 'logout'])->middleware('auth:teacher');
});

Route::prefix('/student')->group(function () {
    Route::post('/register', [StudentAuthController::class, 'register']);
    Route::post('/login', [StudentAuthController::class, 'login']);
    Route::post('/logout', [StudentAuthController::class, 'logout'])->middleware('auth:student');
});

