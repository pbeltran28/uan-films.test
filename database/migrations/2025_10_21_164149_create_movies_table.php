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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('release_year');
            $table->text('synopsis');
            $table->string('director');
            $table->text('cast');
            $table->foreignId('genre_id')->constrained('genres')->onDelete('cascade');
            $table->string('hash_code')->unique();
            $table->string('poster_path')->nullable();
            $table->string('original_title');
            $table->string('original_language');
            $table->decimal('popularity', 10, 2)->default(0);
            $table->boolean('video')->default(false);
            $table->decimal('vote_average', 3, 1)->default(0);
            $table->integer('vote_count')->default(0);
            $table->date('release_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
