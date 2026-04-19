<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shift extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'branch_id',
        'clock_in',
        'clock_out',
        'hourly_rate',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'clock_in'    => 'datetime',
            'clock_out'   => 'datetime',
            'hourly_rate' => 'decimal:2',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function getHoursWorkedAttribute(): float
    {
        if (!$this->clock_out) return 0;
        return round($this->clock_in->diffInMinutes($this->clock_out) / 60, 2);
    }

    public function getShiftPayAttribute(): float
    {
        return $this->hours_worked * ($this->hourly_rate ?? 0);
    }

    public function isActive(): bool
    {
        return is_null($this->clock_out);
    }
}
