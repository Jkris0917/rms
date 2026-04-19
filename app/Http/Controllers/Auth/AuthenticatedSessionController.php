<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => true,
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        /** @var \App\Models\User $user */
        $user = Auth::user()->load('profile');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'  => 'Login successful.',
            'token'    => $token,
            'user'     => [
                'id'       => $user->id,
                'username' => $user->username,
                'email'    => $user->email,
                'profile'  => $user->profile,
                'roles'    => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'dashboard' => $this->resolveDashboard($user),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        // Delete API token if it exists (for token-based auth)
        $token = $request->user()->currentAccessToken();
        if ($token) {
            $token->delete();
        }

        // Logout from session
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Resolve the dashboard route based on the user's role.
     */
    private function resolveDashboard(\App\Models\User $user): array
    {
        return match (true) {
            $user->hasRole('super_admin')     => [
                'route' => '/superadmin/dashboard',
                'label' => 'Super Admin Dashboard',
            ],
            $user->hasRole('manager')         => [
                'route' => '/manager/dashboard',
                'label' => 'Manager Dashboard',
            ],
            $user->hasRole('cashier')         => [
                'route' => '/cashier/dashboard',
                'label' => 'Cashier Dashboard',
            ],
            $user->hasRole('waiter')          => [
                'route' => '/waiter/dashboard',
                'label' => 'Waiter Dashboard',
            ],
            $user->hasRole('chef')            => [
                'route' => '/chef/dashboard',
                'label' => 'Chef Dashboard',
            ],
            $user->hasRole('kitchen_staff')   => [
                'route' => '/kitchen_staff/dashboard',
                'label' => 'Kitchen Dashboard',
            ],
            $user->hasRole('delivery_driver') => [
                'route' => '/delivery_driver/dashboard',
                'label' => 'Delivery Dashboard',
            ],
            $user->hasRole('customer')        => [
                'route' => '/customer/dashboard',
                'label' => 'Customer Dashboard',
            ],
            default                           => [
                'route' => '/dashboard',
                'label' => 'Dashboard',
            ],
        };
    }
}
