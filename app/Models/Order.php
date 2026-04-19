<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'branch_id',
        'dining_table_id',
        'customer_id',
        'waiter_id',
        'reservation_id',
        'type',
        'status',
        'covers',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'tip_amount',
        'delivery_fee',
        'total_amount',
        'notes',
        'placed_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'subtotal'         => 'decimal:2',
            'tax_amount'       => 'decimal:2',
            'discount_amount'  => 'decimal:2',
            'tip_amount'       => 'decimal:2',
            'delivery_fee'     => 'decimal:2',
            'total_amount'     => 'decimal:2',
            'placed_at'        => 'datetime',
            'completed_at'     => 'datetime',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function diningTable(): BelongsTo
    {
        return $this->belongsTo(DiningTable::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function waiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'waiter_id');
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function discounts(): BelongsToMany
    {
        return $this->belongsToMany(Discount::class, 'order_discounts')
            ->withPivot('discount_amount')
            ->withTimestamps();
    }

    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }

    public function feedback(): HasOne
    {
        return $this->hasOne(Feedback::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function getTotalPaidAttribute(): float
    {
        return $this->payments()->where('status', 'completed')->sum('amount');
    }

    public function getBalanceDueAttribute(): float
    {
        return max(0, $this->total_amount - $this->total_paid);
    }

    public function recalculateTotals(): void
    {
        $this->subtotal       = $this->orderItems()->sum('subtotal');
        $this->tax_amount     = round($this->subtotal * 0.12, 2); // 12% VAT
        $this->total_amount   = $this->subtotal + $this->tax_amount
            + $this->delivery_fee + $this->tip_amount
            - $this->discount_amount;
        $this->save();
    }

    protected static function booted(): void
    {
        static::creating(function (Order $order) {
            if (empty($order->order_number)) {
                $order->order_number = 'ORD-' . strtoupper(uniqid());
            }
        });
    }
}
