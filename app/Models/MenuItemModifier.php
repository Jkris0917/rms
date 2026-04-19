<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItemModifier extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_item_id',
        'name',
        'is_required',
        'allow_multiple',
    ];

    protected function casts(): array
    {
        return [
            'is_required'    => 'boolean',
            'allow_multiple' => 'boolean',
        ];
    }

    public function menuItem(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(MenuItemModifierOption::class);
    }
}
