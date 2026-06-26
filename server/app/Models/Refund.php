<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    protected $fillable = [
        'order_id',
        'cliente_id',
        'date_solicitation',
        'date_response',
        'reason',
        'status',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
