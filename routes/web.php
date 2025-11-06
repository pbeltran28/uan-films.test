<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación
Route::middleware('guest')
    ->group(function () {
        // Mostrar formularios
        Route::get('/login', [AuthController::class, 'showLoginForm'])->name('auth.login');
        Route::get('/create-account', [AuthController::class, 'showRegisterForm'])->name('auth.register');

        // Procesar formularios
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login.post');
        Route::post('/register', [AuthController::class, 'register'])->name('auth.register.post');
    });

// Rutas protegidas
Route::middleware('auth')->group(function () {
    Route::get('/', HomeController::class)->name('home');
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

