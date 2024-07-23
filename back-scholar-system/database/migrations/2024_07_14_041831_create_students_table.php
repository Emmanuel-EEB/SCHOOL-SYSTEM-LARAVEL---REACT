<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('rut')->unique();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->unsignedBigInteger('curso_id')->nullable(); // Definimos la columna curso_id como un entero sin signo (unsigned)
            
            $table->foreign('curso_id') // Definimos curso_id como clave foránea que referencia la columna id de la tabla courses
                ->references('id')
                ->on('cursos')
                ->onDelete('cascade'); // Opcional: podemos configurar el borrado en cascada
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }

    
};
