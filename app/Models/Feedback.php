<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'customer_id',
        'food_rating',
        'service_rating',
        'ambiance_rating',
        'comment',
        'is_public',
    ];

    protected function casts(): array
    {
        return ['is_public' => 'boolean'];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function getAverageRatingAttribute(): float
    {
        $ratings = array_filter([
            $this->food_rating,
            $this->service_rating,
            $this->ambiance_rating,
        ]);
        return count($ratings) ? round(array_sum($ratings) / count($ratings), 1) : 0;
    }
}
