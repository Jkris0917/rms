<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',

    // Basic info
    'first_name',
    'middle_name',
    'last_name',
    'phone',
    'avatar',
    'address',
    'date_of_birth',
    'gender',

    // Emergency contact
    'emergency_contact_name',
    'emergency_contact_phone',
    'emergency_contact_relationship',

    // Employment info
    'position',
    'hire_date',
    'salary',
    'employment_type',
    'employee_id',
    'employment_status',

    // Schedule / shift
    'shift',
    'work_days',
    'shift_start',
    'shift_end',

    // Social media
    'facebook',
    'instagram',
    'twitter',

    // Customer-specific
    'dietary_restrictions',
    'allergies',
    'notes',
])]
class Profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'hire_date'     => 'date',
            'salary'        => 'decimal:2',
            'work_days'     => 'array',
            'shift_start'   => 'string',
            'shift_end'     => 'string',
        ];
    }

    // ─── Relationships ────────────────────────────────────────────

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // ─── Accessors ────────────────────────────────────────────────

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getAgeAttribute(): ?int
    {
        return $this->date_of_birth?->age;
    }

    public function getShiftHoursAttribute(): ?string
    {
        if ($this->shift_start && $this->shift_end) {
            return "{$this->shift_start} – {$this->shift_end}";
        }
        return null;
    }

    public function getIsStaffAttribute(): bool
    {
        return $this->user->hasAnyRole(User::STAFF_ROLES);
    }

    public function getIsCustomerAttribute(): bool
    {
        return $this->user->hasRole('customer');
    }

    // ─── Scopes ───────────────────────────────────────────────────

    public function scopeStaff(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereHas('user', function ($q) {
            $q->whereHas('roles', fn($r) => $r->whereIn('name', User::STAFF_ROLES));
        });
    }

    public function scopeCustomers(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereHas('user', function ($q) {
            $q->whereHas('roles', fn($r) => $r->where('name', 'customer'));
        });
    }

    public function scopeActiveStaff(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->staff()->where('employment_status', 'active');
    }

    public function scopeByShift(\Illuminate\Database\Eloquent\Builder $query, string $shift): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where('shift', $shift);
    }

    public function scopeByRole(\Illuminate\Database\Eloquent\Builder $query, string $role): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereHas('user', function ($q) use ($role) {
            $q->whereHas('roles', fn($r) => $r->where('name', $role));
        });
    }

    public function scopeKitchen(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereHas('user', function ($q) {
            $q->whereHas('roles', fn($r) => $r->whereIn('name', ['chef', 'kitchen_staff']));
        });
    }

    public function scopeDeliveryDrivers(\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->whereHas('user', function ($q) {
            $q->whereHas('roles', fn($r) => $r->where('name', 'delivery_driver'));
        });
    }
}
