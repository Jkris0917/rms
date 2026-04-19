<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var \App\Models\User|null $user */
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id'          => $user->id,
                    'username'    => $user->username,
                    'email'       => $user->email,
                    'roles'       => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                    'profile'     => $user->profile ? [
                        'first_name'  => $user->profile->first_name,
                        'middle_name' => $user->profile->middle_name,
                        'last_name'   => $user->profile->last_name,
                        'full_name'   => $user->profile->full_name,
                        'phone'       => $user->profile->phone,
                        'avatar'      => $user->profile->avatar,
                        'position'    => $user->profile->position,
                    ] : null,
                    'dashboard'   => $this->resolveDashboard($user),
                ] : null,
            ],
        ];
    }

    /**
     * Resolve dashboard route per role.
     */
    private function resolveDashboard(\App\Models\User $user): array
    {
        return match (true) {
            $user->hasRole('super_admin')     => ['route' => 'dashboard.super-admin', 'label' => 'Super Admin Dashboard'],
            $user->hasRole('manager')         => ['route' => 'dashboard.manager',     'label' => 'Manager Dashboard'],
            $user->hasRole('cashier')         => ['route' => 'dashboard.cashier',     'label' => 'Cashier Dashboard'],
            $user->hasRole('waiter')          => ['route' => 'dashboard.waiter',      'label' => 'Waiter Dashboard'],
            $user->hasRole('chef')            => ['route' => 'dashboard.chef',        'label' => 'Chef Dashboard'],
            $user->hasRole('kitchen_staff')   => ['route' => 'dashboard.kitchen',     'label' => 'Kitchen Dashboard'],
            $user->hasRole('delivery_driver') => ['route' => 'dashboard.delivery',    'label' => 'Delivery Dashboard'],
            $user->hasRole('customer')        => ['route' => 'dashboard.customer',    'label' => 'Customer Dashboard'],
            default                           => ['route' => 'dashboard',             'label' => 'Dashboard'],
        };
    }
}
