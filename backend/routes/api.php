<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/register', [AuthController::class, 'register'])->name('register');
    });

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('me', [AuthController::class, 'me'])->name('me');
    });

    Route::get('/user-summary', [ReviewController::class, 'userSummary'])->name('user.summary');

    Route::prefix('options')->name('options.')->group(function () {
        Route::get('genres', [OptionController::class, 'genres'])->name('genres');
    });

    Route::apiResource('movies', MovieController::class);

    Route::prefix('movies/{movie}')->name('movies.reviews.')->group(function () {
        Route::apiResource('reviews', ReviewController::class)->only(['store', 'update', 'destroy']);
    });
});
