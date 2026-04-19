<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'delivery_driver_id',
        'delivery_address',
        'latitude',
        'longitude',
        'status',
        'estimated_at',
        'delivered_at',
        'delivery_notes',
    ];

    protected function casts(): array
    {
        return [
            'latitude'     => 'decimal:7',
            'longitude'    => 'decimal:7',
            'estimated_at' => 'datetime',
            'delivered_at' => 'datetime',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(DeliveryDriver::class, 'delivery_driver_id');
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function isDelivered(): bool
    {
        return $this->status === 'delivered';
    }
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
}
