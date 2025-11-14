<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $user = Socialite::driver('google')->user()->user;

            $user = User::updateOrCreate([
                'email' => $user['email'],
            ], [
                'oauth_id' => $user['id'],
                'oauth_provider' => 'google',
                'name' => $user['name'],
                'profile_image' => $user['picture'],
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;
            dd($token);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al iniciar sesión con Google',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
