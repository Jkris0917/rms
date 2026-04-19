<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItemModifierOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_item_modifier_id',
        'name',
        'additional_price',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'additional_price' => 'decimal:2',
            'is_default'       => 'boolean',
        ];
    }

    public function modifier(): BelongsTo
    {
        return $this->belongsTo(MenuItemModifier::class, 'menu_item_modifier_id');
    }

    public function orderItemModifiers(): HasMany
    {
        return $this->hasMany(OrderItemModifier::class);
    }
}
