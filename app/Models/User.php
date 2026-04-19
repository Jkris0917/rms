<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['username', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    // ─── All staff roles in one place ────────────────────────────

    const STAFF_ROLES = [
        'super_admin',
        'manager',
        'cashier',
        'waiter',
        'chef',
        'kitchen_staff',
        'delivery_driver',
    ];

    // ─────────────────────────────────────────────────────────────

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ─── Relationships ────────────────────────────────────────────

    public function profile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Profile::class);
    }

    // ─── Helpers ──────────────────────────────────────────────────

    public function isStaff(): bool
    {
        return $this->hasAnyRole(self::STAFF_ROLES);
    }

    public function isCustomer(): bool
    {
        return $this->hasRole('customer');
    }

    public function isManager(): bool
    {
        return $this->hasAnyRole(['super_admin', 'manager']);
    }

    public function isKitchen(): bool
    {
        return $this->hasAnyRole(['chef', 'kitchen_staff']);
    }

    public function isDelivery(): bool
    {
        return $this->hasRole('delivery_driver');
    }
}
