<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'birthday',
        'address',
        'loyalty_points',
        'loyalty_tier',
        'notes',
    ];

    protected function casts(): array
    {
        return ['birthday' => 'date'];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function feedback(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function getTotalSpentAttribute(): float
    {
        return $this->orders()
            ->where('status', 'completed')
            ->sum('total_amount');
    }

    public function addLoyaltyPoints(int $points): void
    {
        $this->increment('loyalty_points', $points);
        $this->updateLoyaltyTier();
    }

    private function updateLoyaltyTier(): void
    {
        $this->loyalty_tier = match (true) {
            $this->loyalty_points >= 5000 => 'gold',
            $this->loyalty_points >= 1000 => 'silver',
            default                       => 'bronze',
        };
        $this->save();
    }
}
