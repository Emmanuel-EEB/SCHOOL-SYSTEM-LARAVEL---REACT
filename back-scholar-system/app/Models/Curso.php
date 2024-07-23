<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function asignaturas()
    {
        return $this->belongsToMany(Asignatura::class, 'curso_asignatura');
    }
}
