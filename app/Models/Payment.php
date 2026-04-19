<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'cashier_id',
        'transaction_number',
        'amount',
        'method',
        'status',
        'change_amount',
        'reference_number',
        'notes',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'amount'        => 'decimal:2',
            'change_amount' => 'decimal:2',
            'paid_at'       => 'datetime',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function cashier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
    public function isRefunded(): bool
    {
        return $this->status === 'refunded';
    }

    protected static function booted(): void
    {
        static::creating(function (Payment $payment) {
            if (empty($payment->transaction_number)) {
                $payment->transaction_number = 'TXN-' . strtoupper(uniqid());
            }
        });
    }
}
