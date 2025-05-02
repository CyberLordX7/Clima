import { useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { useAlarm } from '@/context/AlarmContext';


export default function AlarmNotification() {
    const { notifications, markAsRead, playAlarmSound } = useAlarm();
    const { auth } = usePage().props;

    useEffect(() => {
        if (notifications.some(n => !n.read)) {
            playAlarmSound();


            if ('Notification' in window && Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
        }
    }, [notifications]);

    return (
        <div className="fixed bottom-4 right-4 space-y-2">
            {notifications.filter(n => !n.read).map(notification => (
                <div
                    key={notification.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border-l-4 border-yellow-500"
                >
                    <p>{notification.message}</p>
                    <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 text-sm text-blue-600 dark:text-blue-400"
                    >
                        Dismiss
                    </button>
                </div>
            ))}
        </div>
    );
}
