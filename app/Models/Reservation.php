<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'branch_id',
        'customer_id',
        'dining_table_id',
        'guest_name',
        'guest_phone',
        'guest_email',
        'reserved_at',
        'party_size',
        'status',
        'special_requests',
        'deposit_amount',
    ];

    protected function casts(): array
    {
        return [
            'reserved_at'    => 'datetime',
            'deposit_amount' => 'decimal:2',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function diningTable(): BelongsTo
    {
        return $this->belongsTo(DiningTable::class);
    }

    public function order(): HasOne
    {
        return $this->hasOne(Order::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
}
