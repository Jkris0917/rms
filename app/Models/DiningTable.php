<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiningTable extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'table_number',
        'capacity',
        'status',
        'location',
        'qr_code',
    ];

    // ─── Relationships ───────────────────────────────────────────

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }
    public function isOccupied(): bool
    {
        return $this->status === 'occupied';
    }

    public function activeOrder()
    {
        return $this->orders()
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->latest()
            ->first();
    }
}
