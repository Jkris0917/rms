<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users (Inertia page).
     */
    public function index()
    {
        return Inertia::render('Superadmin/Users/Index');
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Superadmin/Users/Create');
    }

    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'username' => $validated['username'],
                'email'    => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            // Assign role
            if (!empty($validated['role'])) {
                $user->assignRole($validated['role']);
            }

            // Create profile
            $profileData = collect($validated)->except(['username', 'email', 'password', 'password_confirmation', 'role'])->toArray();
            if (!empty($profileData)) {
                $user->profile()->create($profileData);
            }
        });

        return response()->json(['message' => 'User created successfully.'], 201);
    }

    /**
     * Display the specified user (Inertia page).
     */
    public function show(string $id)
    {
        $user = User::with(['profile', 'roles'])->findOrFail($id);

        return Inertia::render('Superadmin/Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(string $id)
    {
        $user = User::with(['profile', 'roles'])->findOrFail($id);

        return Inertia::render('Superadmin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $user     = User::with('profile')->findOrFail($id);
        $validated = $request->validated();

        DB::transaction(function () use ($user, $validated) {
            // Update user credentials
            $userFields = collect($validated)->only(['username', 'email'])->toArray();
            if (!empty($validated['password'])) {
                $userFields['password'] = Hash::make($validated['password']);
            }
            $user->update($userFields);

            // Sync role
            if (!empty($validated['role'])) {
                $user->syncRoles([$validated['role']]);
            }

            // Update or create profile
            $profileData = collect($validated)
                ->except(['username', 'email', 'password', 'password_confirmation', 'role'])
                ->toArray();

            if (!empty($profileData)) {
                $user->profile()->updateOrCreate(['user_id' => $user->id], $profileData);
            }
        });

        return response()->json(['message' => 'User updated successfully.']);
    }

    /**
     * Soft delete the specified user.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    /**
     * Restore a soft-deleted user.
     */
    public function restore(string $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return response()->json(['message' => 'User restored successfully.']);
    }
}
