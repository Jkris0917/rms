<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'inventory_category_id',
        'branch_id',
        'name',
        'sku',
        'unit',
        'quantity',
        'low_stock_threshold',
        'unit_cost',
        'expiry_date',
    ];

    protected function casts(): array
    {
        return [
            'quantity'            => 'decimal:3',
            'low_stock_threshold' => 'decimal:3',
            'unit_cost'           => 'decimal:2',
            'expiry_date'         => 'date',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function category(): BelongsTo
    {
        return $this->belongsTo(InventoryCategory::class, 'inventory_category_id');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class);
    }

    public function purchaseOrderItems(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /** Menu items that use this ingredient */
    public function menuItems(): BelongsToMany
    {
        return $this->belongsToMany(MenuItem::class, 'recipes')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function recipes(): HasMany
    {
        return $this->hasMany(Recipe::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isLowStock(): bool
    {
        return $this->quantity <= $this->low_stock_threshold;
    }

    public function isOutOfStock(): bool
    {
        return $this->quantity <= 0;
    }

    public function isExpired(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    public function adjustStock(float $qty, string $type, ?int $userId = null, string $notes = ''): void
    {
        $this->increment('quantity', $qty);
        $this->transactions()->create([
            'user_id' => $userId,
            'type'    => $type,
            'quantity' => $qty,
            'notes'   => $notes,
        ]);
    }
}
