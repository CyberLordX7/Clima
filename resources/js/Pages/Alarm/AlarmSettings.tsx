import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import TimezoneSelect from 'react-timezone-select';
import { useAlarm } from '@/context/AlarmContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AlarmSettings() {
    const { auth } = usePage().props;
    const {
        settings,
        nextAlarm,
        sunData,
        loading,
        updateSettings,
        refreshData,
        detectLocation
    } = useAlarm();
    const [localSettings, setLocalSettings] = useState(settings);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setLocalSettings(settings);
        setIsDirty(false);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLocalSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setIsDirty(true);
    };

    const handleTimezoneChange = (tz: any) => {
        setLocalSettings(prev => ({
            ...prev,
            timezone: tz.value,
        }));
        setIsDirty(true);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({
            ...prev,
            [name]: value ? parseFloat(value) : null,
        }));
        setIsDirty(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateSettings(localSettings);
    };

    if (!auth.user) {
        return (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                Please log in to configure sunrise/sunset alarms.
            </div>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-screen">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Sunrise/Sunset Alarm Settings
                    </h2>
                    <button
                    type="button"
                    onClick={detectLocation}
                    className="mt-2 px-3 py-1 bg-gray-100 rounded-md"
                    >
                    Detect My Location
                    </button>
                    <button
                        onClick={refreshData}
                        disabled={loading}
                        className="px-3 py-1 text-sm dark:text-white bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                        Refresh Data
                    </button>

                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                            Location Settings
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={localSettings.latitude || ''}
                                    onChange={handleLocationChange}

                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., 40.7128"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={localSettings.longitude || ''}
                                    onChange={handleLocationChange}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., -74.0060"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Timezone
                            </label>
                            <TimezoneSelect
                                value={localSettings.timezone}
                                onChange={handleTimezoneChange}
                                className="react-timezone-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                            Alarm Settings
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sunrise_alarm"
                                    name="sunrise_alarm"
                                    checked={localSettings.sunrise_alarm}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="sunrise_alarm" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Enable Sunrise Alarm
                                </label>
                            </div>

                            {localSettings.sunrise_alarm && (
                                <div className="ml-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Sunrise Offset (HH:MM)
                                    </label>
                                    <input
                                        type="time"
                                        name="sunrise_offset"
                                        value={localSettings.sunrise_offset}
                                        onChange={handleChange}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            )}

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sunset_alarm"
                                    name="sunset_alarm"
                                    checked={localSettings.sunset_alarm}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="sunset_alarm" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Enable Sunset Alarm
                                </label>
                            </div>

                            {localSettings.sunset_alarm && (
                                <div className="ml-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Sunset Offset (HH:MM)
                                    </label>
                                    <input
                                        type="time"
                                        name="sunset_offset"
                                        value={localSettings.sunset_offset}
                                        onChange={handleChange}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={!isDirty || loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>

                        {isDirty && (
                            <button
                                type="button"
                                onClick={() => {
                                    setLocalSettings(settings);
                                    setIsDirty(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {(sunData || nextAlarm) && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                            Sun Information
                        </h3>

                        {sunData && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
                                    <p className="font-medium dark:text-white">
                                        {sunData.sunrise ? new Date(sunData.sunrise).toLocaleTimeString() : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Solar Noon</p>
                                    <p className="font-medium dark:text-white">
                                        {sunData.solar_noon ? new Date(sunData.solar_noon).toLocaleTimeString() : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
                                    <p className="font-medium dark:text-white">
                                        {sunData.sunset ? new Date(sunData.sunset).toLocaleTimeString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {nextAlarm && (
                            <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Next Alarm</p>
                                <p className="font-medium">
                                    {new Date(nextAlarm).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
