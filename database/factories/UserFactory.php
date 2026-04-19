<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'username'           => fake()->unique()->userName(),
            'email'              => fake()->unique()->safeEmail(),
            'email_verified_at'  => now(),
            'password'           => static::$password ??= Hash::make('password'),
            'remember_token'     => Str::random(10),
        ];
    }

    // ─── States ───────────────────────────────────────────────────

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function withRole(string $role): static
    {
        return $this->afterCreating(function (User $user) use ($role) {
            $user->assignRole($role);
        });
    }

    public function superAdmin(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('super_admin');
        });
    }

    public function manager(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('manager');
        });
    }

    public function waiter(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('waiter');
        });
    }

    public function cashier(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('cashier');
        });
    }

    public function chef(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('chef');
        });
    }

    public function kitchenStaff(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('kitchen_staff');
        });
    }

    public function deliveryDriver(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('delivery_driver');
        });
    }

    public function customer(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('customer');
        });
    }
}
