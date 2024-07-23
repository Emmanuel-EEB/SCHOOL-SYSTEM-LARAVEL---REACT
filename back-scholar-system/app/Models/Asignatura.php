<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];

    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_asignatura');
    }

    public function teachers()
    {
        return $this->belongsToMany(Curso::class, 'teacher_asignatura');
    }
}
