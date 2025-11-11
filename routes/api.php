<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware("guest")
->prefix("auth")
->name("auth.")
->group(function () {
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
});

Route::middleware("auth:sanctum")->group(function () {
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post("/logout", [AuthController::class, "logout"])->name("logout");
        Route::get('me', [AuthController::class, "me"])->name("me");
    });
});