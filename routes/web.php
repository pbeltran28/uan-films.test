<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Rutas de autenticación
Route::prefix('auth')->group(function () {
    // Mostrar formularios
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('auth.login');
    Route::get('/create-account', [AuthController::class, 'showRegisterForm'])->name('auth.register');
    
    // Procesar formularios
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login.post');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register.post');
    
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

// Rutas alternativas más simples
Route::get('/login', [AuthController::class, 'showLoginForm']);
Route::get('/create-account', [AuthController::class, 'showRegisterForm']);
