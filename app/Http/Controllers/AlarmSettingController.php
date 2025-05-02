<?php
namespace App\Http\Controllers;

use App\Models\AlarmSetting;
use App\Services\SunCalculatorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AlarmSettingController extends Controller
{
    protected $sunCalculator;

    public function __construct(SunCalculatorService $sunCalculator)
    {
        $this->sunCalculator = $sunCalculator;
    }

        public function show()
    {
        $settings = AlarmSetting::firstOrCreate(
            ['user_id' => Auth::id()],
            ['timezone' => 'Africa/Lagos']
        );

        $nextAlarm = $this->sunCalculator->nextAlarmTime($settings);
        $sunData = $this->sunCalculator->calculateTimes(
            $settings->latitude,
            $settings->longitude,
            now(),
            $settings->timezone
        );

        return Inertia::render('Alarm/AlarmSettings', [
            'initialData' => [
                'settings' => $settings,
                'alarmData' => [
                    'nextAlarm' => $nextAlarm?->toIso8601String(),
                    'sunData' => $sunData
                ]
            ],
            'initialSettings' => $settings,
            'initialAlarmData' => [
                'nextAlarm' => $nextAlarm?->toIso8601String(),
                'sunData' => $sunData
            ]
        ]);
    }

    public function getSettings()
    {
        $settings = AlarmSetting::firstOrCreate(
            ['user_id' => Auth::id()],
            ['timezone' => 'UTC']
        );

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'sunrise_alarm' => 'boolean',
            'sunrise_offset' => 'date_format:H:i',
            'sunset_alarm' => 'boolean',
            'sunset_offset' => 'date_format:H:i',
            'timezone' => 'timezone',
            'latitude' => 'numeric|between:-90,90',
            'longitude' => 'numeric|between:-180,180',
        ]);

        $settings = AlarmSetting::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        return response()->json($settings);
    }

    public function nextAlarm()
    {
        $settings = AlarmSetting::where('user_id', Auth::id())->first();

        if (!$settings) {
            return response()->json(['next_alarm' => null]);
        }

        $nextAlarm = $this->sunCalculator->nextAlarmTime($settings);

        return response()->json([
            'next_alarm' => $nextAlarm?->toIso8601String(),
            'sun_data' => $this->sunCalculator->calculateTimes(
                $settings->latitude,
                $settings->longitude,
                now(),
                $settings->timezone
            )
        ]);
    }
}
