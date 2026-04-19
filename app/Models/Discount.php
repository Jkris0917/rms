<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'type',
        'value',
        'minimum_order',
        'usage_limit',
        'usage_count',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'value'         => 'decimal:2',
            'minimum_order' => 'decimal:2',
            'is_active'     => 'boolean',
            'valid_from'    => 'date',
            'valid_until'   => 'date',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_discounts')
            ->withPivot('discount_amount')
            ->withTimestamps();
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isValid(): bool
    {
        if (!$this->is_active) return false;
        if ($this->usage_limit && $this->usage_count >= $this->usage_limit) return false;
        $today = now()->toDateString();
        if ($this->valid_from && $this->valid_from > $today) return false;
        if ($this->valid_until && $this->valid_until < $today) return false;
        return true;
    }

    public function calculateDiscount(float $orderTotal): float
    {
        if ($orderTotal < $this->minimum_order) return 0;
        return $this->type === 'percentage'
            ? round($orderTotal * ($this->value / 100), 2)
            : min($this->value, $orderTotal);
    }
}
