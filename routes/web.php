<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth:sanctum', 'verified'])->prefix('superadmin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('superadmin.dashboard');

    Route::get('users', function () {
        return Inertia::render('SuperAdmin/User/Index');
    })->name('superadmin.users.index');

    Route::get('users/create', function () {
        return Inertia::render('SuperAdmin/User/Create');
    })->name('superadmin.users.create');

    Route::get('users/{user}', function (\App\Models\User $user) {
        return Inertia::render('SuperAdmin/User/Show', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'roles' => $user->roles()->with('permissions')->get()->map(fn($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->pluck('name'),
                ])->toArray(),
                'profile' => $user->profile ? [
                    'id' => $user->profile->id,
                    'first_name' => $user->profile->first_name,
                    'middle_name' => $user->profile->middle_name,
                    'last_name' => $user->profile->last_name,
                    'phone' => $user->profile->phone,
                    'avatar' => $user->profile->avatar,
                    'address' => $user->profile->address,
                    'date_of_birth' => $user->profile->date_of_birth,
                    'gender' => $user->profile->gender,
                ] : null,
            ],
        ]);
    })->name('superadmin.users.show');

    Route::get('users/{user}/edit', function (\App\Models\User $user) {
        return Inertia::render('SuperAdmin/User/Edit', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'roles' => $user->roles()->with('permissions')->get()->map(fn($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->pluck('name'),
                ])->toArray(),
                'profile' => $user->profile ? [
                    'id' => $user->profile->id,
                    'first_name' => $user->profile->first_name,
                    'middle_name' => $user->profile->middle_name,
                    'last_name' => $user->profile->last_name,
                    'phone' => $user->profile->phone,
                    'avatar' => $user->profile->avatar,
                    'address' => $user->profile->address,
                    'date_of_birth' => $user->profile->date_of_birth,
                    'gender' => $user->profile->gender,
                ] : null,
            ],
        ]);
    })->name('superadmin.users.edit');

    Route::get('branches', fn() => Inertia::render('SuperAdmin/Branch/Index'))
        ->name('superadmin.branches.index');
    Route::get('tables', fn() => Inertia::render('SuperAdmin/Table/Index'))
        ->name('superadmin.tables.index');
    Route::get('menu-categories', fn() => Inertia::render('SuperAdmin/Menu/Category/Index'))
        ->name('superadmin.menu-categories.index');
    Route::get('suppliers', fn() => Inertia::render('SuperAdmin/Inventory/Supplier/Index'))
        ->name('superadmin.suppliers.index');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
