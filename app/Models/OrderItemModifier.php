<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItemModifier extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_item_id',
        'menu_item_modifier_option_id',
        'modifier_name',
        'option_name',
        'additional_price',
    ];

    protected function casts(): array
    {
        return ['additional_price' => 'decimal:2'];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }

    public function modifierOption(): BelongsTo
    {
        return $this->belongsTo(MenuItemModifierOption::class, 'menu_item_modifier_option_id');
    }
}
