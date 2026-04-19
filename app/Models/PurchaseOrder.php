<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'po_number',
        'supplier_id',
        'branch_id',
        'ordered_by',
        'status',
        'total_amount',
        'expected_delivery',
        'received_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'total_amount'      => 'decimal:2',
            'expected_delivery' => 'date',
            'received_at'       => 'date',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function orderedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ordered_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    // ─── Helpers ────────────────────────────────────────────────

    public function recalculateTotal(): void
    {
        $this->total_amount = $this->items()->sum('total_cost');
        $this->save();
    }

    protected static function booted(): void
    {
        static::creating(function (PurchaseOrder $po) {
            if (empty($po->po_number)) {
                $po->po_number = 'PO-' . strtoupper(uniqid());
            }
        });
    }
}
