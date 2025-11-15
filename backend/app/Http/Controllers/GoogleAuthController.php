<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Socialite;
use Illuminate\Http\Request;

class GoogleAuthController extends Controller
{
    const CALLBACK_URL_SESSION_KEY = 'callback-url';
    const DEFAULT_CALLBACK_URL = 'http://localhost:3000';

    public function redirect(Request $request)
    {
        $request->session()->put(self::CALLBACK_URL_SESSION_KEY, $request->query(self::CALLBACK_URL_SESSION_KEY, self::DEFAULT_CALLBACK_URL));
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
        $callbackUrl = $request->session()->get(self::CALLBACK_URL_SESSION_KEY, self::DEFAULT_CALLBACK_URL);
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
            return redirect($callbackUrl . '?token=' . $token);
        } catch (\Exception $e) {
            return redirect($callbackUrl . '?error=' . $e->getMessage());
        }finally {
            $request->session()->forget(self::CALLBACK_URL_SESSION_KEY);
        }
    }
}
