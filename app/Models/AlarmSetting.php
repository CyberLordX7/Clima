<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlarmSetting extends Model
{
    protected $fillable = [
        'user_id',
        'sunrise_alarm',
        'sunrise_offset',
        'sunset_alarm',
        'sunset_offset',
        'timezone',
        'latitude',
        'longitude'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
