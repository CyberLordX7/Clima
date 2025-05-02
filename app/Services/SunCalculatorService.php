<?php

namespace App\Services;

use Carbon\Carbon;

class SunCalculatorService
{
    public function calculateTimes($latitude, $longitude, $date = null, $tz = 'UTC')
    {
        $date = $date ? Carbon::parse($date) : now();

        
        $sunInfo = date_sun_info(
            $date->timestamp,
            $latitude,
            $longitude
        );

        return [
            'sunrise' => Carbon::createFromTimestamp($sunInfo['sunrise'])->setTimezone($tz),
            'sunset' => Carbon::createFromTimestamp($sunInfo['sunset'])->setTimezone($tz),
            'solar_noon' => Carbon::createFromTimestamp($sunInfo['transit'])->setTimezone($tz),
        ];
    }

    public function nextAlarmTime($alarmSetting)
    {
        if (!$alarmSetting->sunrise_alarm && !$alarmSetting->sunset_alarm) {
            return null;
        }

        $now = now()->setTimezone($alarmSetting->timezone);
        $todayTimes = $this->calculateTimes(
            $alarmSetting->latitude,
            $alarmSetting->longitude,
            $now,
            $alarmSetting->timezone
        );

        $sunriseWithOffset = $todayTimes['sunrise']->copy()
            ->addHours(explode(':', $alarmSetting->sunrise_offset)[0])
            ->addMinutes(explode(':', $alarmSetting->sunrise_offset)[1]);

        $sunsetWithOffset = $todayTimes['sunset']->copy()
            ->addHours(explode(':', $alarmSetting->sunset_offset)[0])
            ->addMinutes(explode(':', $alarmSetting->sunset_offset)[1]);

        $nextAlarms = [];

        if ($alarmSetting->sunrise_alarm) {
            $nextAlarms[] = $sunriseWithOffset > $now
                ? $sunriseWithOffset
                : $sunriseWithOffset->addDay();
        }

        if ($alarmSetting->sunset_alarm) {
            $nextAlarms[] = $sunsetWithOffset > $now
                ? $sunsetWithOffset
                : $sunsetWithOffset->addDay();
        }

        return count($nextAlarms) ? min($nextAlarms) : null;
    }
}
