<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\DiningTableController;
use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Protected API Routes ────────────────────────────────────────────────────
// Uses web session auth (same session as Inertia pages) + role guard.

Route::middleware(['web', 'auth', 'verified'])->group(function () {

    // ── Super Admin only ──────────────────────────────────────────────────────
    Route::middleware('role:super_admin')->group(function () {

        // Users
        Route::get('users', function (Request $request) {
            $search = $request->input('search', '');

            $users = \App\Models\User::with(['profile', 'roles'])
                ->when($search, function ($q) use ($search) {
                    $q->where('email', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%")
                        ->orWhereHas(
                            'profile',
                            fn($p) => $p
                                ->where('first_name', 'like', "%{$search}%")
                                ->orWhere('last_name', 'like', "%{$search}%")
                        );
                })
                ->latest()
                ->paginate(10);

            return response()->json($users);
        });

        Route::post('users',                    [UserController::class, 'store']);
        Route::put('users/{user}',              [UserController::class, 'update']);
        Route::delete('users/{user}',           [UserController::class, 'destroy']);
        Route::post('users/{user}/restore',     [UserController::class, 'restore']);

        // IMPORTANT: Put custom routes BEFORE Route::resource
        Route::get('branches/active', [BranchController::class, 'getActiveBranches']);

        // Branches - this should come AFTER custom routes
        Route::Resource('branches', BranchController::class);

        // Tables
        Route::Resource('table', DiningTableController::class);

        //Menu
        Route::Resource('menu-category', MenuCategoryController::class);

        //Inventory
        Route::Resource('suppliers', SupplierController::class);
    });
});
