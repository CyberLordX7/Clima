import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AlarmNotification from '@/Components/AlarmNotification';
import {
  HomeIcon,
  ArrowPathRoundedSquareIcon,
  BanknotesIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ThemeToggle from '@/Components/ThemeToggle';
import { useAlarm } from '@/context/AlarmContext';

import { PageProps } from '@/types';

export default function AuthenticatedLayout({
  children,
  header,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const { auth } = usePage<PageProps>().props;
  const { user } = auth;
  const [activeTab, setActiveTab] = useState('dashboard');
  const { playAlarmSound } = useAlarm();

  useEffect(() => {
    if (!user) return;

    try {
      const channel = window.Echo?.private(`App.Models.User.${user.id}`);

      channel?.notification((notification: any) => {
        if (notification.type === 'sun_alarm') {
          playAlarmSound();
          console.log('Alarm Notification:', notification);

          if (Notification.permission === 'granted') {
            new Notification(notification.message, {
              body: `Triggered at ${new Date(notification.time).toLocaleTimeString()}`,
              icon: '/sun-icon.png'
            });
          }
        }
      });

      return () => {
        channel?.leave();
      };
    } catch (error) {
      console.error('Echo error:', error);
    }
  }, [user, playAlarmSound]);

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: route('customer.dashboard'), current: activeTab === 'dashboard' },
    { name: 'Transfers', icon: ArrowPathRoundedSquareIcon, href: route('customer.transfers'), current: activeTab === 'transfers' },
    { name: 'Payments', icon: BanknotesIcon, href: route('payments'), current: activeTab === 'payments' },
    { name: 'Alarm', icon: ClockIcon, href: route('customer.alarm'), current: activeTab === 'alarm' }, // Fixed typo: 'alram' to 'alarm'
    { name: 'Analytics', icon: ChartBarIcon, href: route('customer.analytics'), current: activeTab === 'analytics' },
  ];

  const secondaryNavigation = [
    { name: 'Settings', icon: Cog6ToothIcon, href: route('customer.settings'), current: false },
    { name: 'Profile', icon: UserIcon, href: route('profile.edit'), current: false },
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-full bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:dark:border-gray-800 lg:dark:bg-gray-800">
          <div className="flex h-16 shrink-0 items-center px-6">
            <Link href={route('customer.dashboard')}>
              <ApplicationLogo className="h-8 w-auto" />
            </Link>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveTab(item.name.toLowerCase())}
                    className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                      item.current
                        ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        item.current
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-auto space-y-1 px-2">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <item.icon
                      className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <ThemeToggle />

                <Dropdown>
                  <Dropdown.Trigger>
                    <button
                      type="button"
                      className="-m-1.5 flex items-center p-1.5"
                      id="user-menu-button"
                    >
                      <span className="sr-only">Open user menu</span>
                      <span className="flex items-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 dark:bg-gray-600">
                          <span className="text-sm font-medium leading-none text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </span>
                        <span className="ml-2 hidden lg:flex lg:items-center">
                          <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-white" aria-hidden="true">
                            {user.name}
                          </span>
                        </span>
                      </span>
                    </button>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {header && (
                <div className="mb-8">
                  <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 sm:flex-row sm:items-center">
                    {header}
                  </div>
                </div>
              )}
              {children}
              <AlarmNotification />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
