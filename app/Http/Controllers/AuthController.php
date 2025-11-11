<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    const AUTH_FIELDS = ['id', 'name', 'email', 'profile_image'];
    /**
     * Procesar el login del usuario
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->has('remember'))) {
            return response()->json([
                'message' => '¡Bienvenido! Has iniciado sesión correctamente.',
                'data' => [
                    'user' => Auth::user()->only(self::AUTH_FIELDS),
                    'token' => Auth::user()->createToken('auth_token')->plainTextToken,
                ],
            ]);
        }

        return response()->json([
            'message' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
        ], 401);
    }

    /**
     * Procesar el registro del usuario
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => '¡Cuenta creada exitosamente! Bienvenido a UANFilms.',
            'data' => [
                'user' => $user->only(self::AUTH_FIELDS),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Cerrar sesión del usuario
     */
    public function logout(Request $request): JsonResponse
    {
        // Eliminar el token actual del usuario
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Has cerrado sesión correctamente.',
        ]);
    }

    /**
     * Obtener información del usuario autenticado
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Usuario autenticado',
            'data' => [
                'user' => $request->user()->only(self::AUTH_FIELDS),
            ],
        ]);
    }
}
