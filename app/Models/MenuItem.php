<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'menu_category_id',
        'name',
        'slug',
        'description',
        'image',
        'price',
        'cost_price',
        'preparation_time',
        'is_available',
        'is_featured',
        'allergens',
        'nutritional_info',
        'type',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price'            => 'decimal:2',
            'cost_price'       => 'decimal:2',
            'is_available'     => 'boolean',
            'is_featured'      => 'boolean',
            'allergens'        => 'array',
            'nutritional_info' => 'array',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function category(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class, 'menu_category_id');
    }

    public function modifiers(): HasMany
    {
        return $this->hasMany(MenuItemModifier::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /** Inventory ingredients used to make this dish */
    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(InventoryItem::class, 'recipes')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function recipes(): HasMany
    {
        return $this->hasMany(Recipe::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function getProfitMarginAttribute(): float
    {
        if (!$this->cost_price || $this->price == 0) return 0;
        return (($this->price - $this->cost_price) / $this->price) * 100;
    }
}
