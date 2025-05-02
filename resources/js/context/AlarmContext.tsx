import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type AlarmSettings = {
    sunrise_alarm: boolean;
    sunrise_offset: string;
    sunset_alarm: boolean;
    sunset_offset: string;
    timezone: string;
    latitude: number | null;
    longitude: number | null;
};

type Notification = {
    id: string;
    message: string;
    time: string;
    read: boolean;
};


type SunData = {
    sunrise: string;
    sunset: string;
    solar_noon: string;
};

type AlarmContextType = {
    settings: AlarmSettings;
    nextAlarm: string | null;
    sunData: SunData | null;
    notifications: Notification[];
    markAsRead: (id: string) => void;
    playAlarmSound: () => void;
    loading: boolean;
    updateSettings: (newSettings: Partial<AlarmSettings>) => Promise<void>;
    refreshData: () => Promise<void>;
    detectLocation: () => void;
};

const AlarmContext = createContext<AlarmContextType>({
    settings: {
        sunrise_alarm: false,
        sunrise_offset: '00:00',
        sunset_alarm: false,
        sunset_offset: '00:00',
        timezone: 'UTC',
        latitude: null,
        longitude: null,
    },
    notifications: [],
    markAsRead: () => {},
    playAlarmSound: () => {},
    nextAlarm: null,
    sunData: null,
    loading: false,
    updateSettings: async () => {},
    refreshData: async () => {},
    detectLocation: () => {},
});

export const AlarmProvider = ({
    children,
    initialData
}: {
    children: React.ReactNode;
    initialData?: {
        settings: AlarmSettings;
        alarmData: {
            nextAlarm: string | null;
            sunData: SunData | null;
        };
    };
}) => {
    const [state, setState] = useState({
        settings: initialData?.settings || {
            sunrise_alarm: false,
            sunrise_offset: '00:00',
            sunset_alarm: false,
            sunset_offset: '00:00',
            timezone: 'UTC',
            latitude: null,
            longitude: null,
        },
        nextAlarm: initialData?.alarmData?.nextAlarm || null,
        sunData: initialData?.alarmData?.sunData || null,
        loading: false,
    });
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const playAlarmSound = () => {
        const audio = new Audio("/alarm.wav");
        audio.play().catch(e => console.log("Audio play failed:", e));
    };
    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? {...n, read: true} : n
        ));
    };


    const detectLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              updateSettings({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => console.error("Geolocation error:", error)
          );
        }
      };


    const refreshData = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const [settingsRes, alarmRes] = await Promise.all([
                axios.get('/alarm-settings'),
                axios.get('/next-alarm')
            ]);

            setState({
                settings: settingsRes.data,
                nextAlarm: alarmRes.data.next_alarm,
                sunData: alarmRes.data.sun_data,
                loading: false,
            });
        } catch (error) {
            console.error('Error refreshing data:', error);
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const updateSettings = async (newSettings: Partial<AlarmSettings>) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.post('/alarm-settings', {
                ...state.settings,
                ...newSettings,
            });

            const alarmRes = await axios.get('/next-alarm');

            setState({
                settings: response.data,
                nextAlarm: alarmRes.data.next_alarm,
                sunData: alarmRes.data.sun_data,
                loading: false,
            });
        } catch (error) {
            console.error('Error updating settings:', error);
            setState(prev => ({ ...prev, loading: false }));
            throw error;
        }
    };

    return (
        <AlarmContext.Provider
            value={{
                settings: state.settings,
                nextAlarm: state.nextAlarm,
                sunData: state.sunData,
                loading: state.loading,
                updateSettings,
                refreshData,
                detectLocation,
                notifications,
                markAsRead,
                playAlarmSound
            }}
        >
            {children}
        </AlarmContext.Provider>
    );
};

export const useAlarm = () => useContext(AlarmContext);
