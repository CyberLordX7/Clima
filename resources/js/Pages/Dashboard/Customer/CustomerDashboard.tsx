// resources/js/Pages/Dashboard.tsx
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import WeatherWidget from '@/Components/WeatherWidget';
import TransferFlow from '@/Components/TransferFlow';
import { ArrowPathRoundedSquareIcon, BanknotesIcon, SunIcon } from '@heroicons/react/24/outline';
import { formatMonetaryValue } from '@/helpers/global';

export default function Dashboard({ auth }: PageProps) {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferType, setTransferType] = useState<'interbank' | 'intrabank'>('interbank');

  const stats = [
    { name: 'Account Balance', value: 4523189, change: '+12%', changeType: 'positive' },
    { name: 'Pending Transfers', value: 234000, change: '+3.2%', changeType: 'positive' },
    { name: 'Weather Alerts', value: '2 Active', change: '-1', changeType: 'negative' },
    { name: 'Scheduled Payments', value: '5 Upcoming', change: '+2', changeType: 'positive' },
  ];

  const recentActivity = [
    { id: 1, type: 'transfer', amount: 120000, account: 'Chase •••• 9912', date: '3h ago', status: 'completed' },
    { id: 2, type: 'payment', amount: 45000, account: 'Electric Bill', date: '1d ago', status: 'completed' },
    { id: 3, type: 'transfer', amount: 80000, account: 'Wells Fargo •••• 5678', date: '2d ago', status: 'pending' },
    { id: 4, type: 'deposit', amount: 250000, account: 'Direct Deposit', date: '3d ago', status: 'completed' },
  ];

  const openTransferModal = (type: 'interbank' | 'intrabank') => {
    setTransferType(type);
    setShowTransferModal(true);
  };

  return (
    <AuthenticatedLayout
      header={
        <>
          <div>
            <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, {auth.user.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => openTransferModal('intrabank')}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Intrabank Transfer
            </button>
            <button
              onClick={() => openTransferModal('interbank')}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
            >
              Interbank Transfer
            </button>
          </div>
        </>
      }
    >
      <Head title="Dashboard" />

      {showTransferModal && (
        <TransferFlow
          type={transferType}
          onClose={() => setShowTransferModal(false)}
        />
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {stat.changeType === 'positive' ? (
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                    </svg>
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{ stat.name == "Weather Alerts" || stat.name == "Scheduled Payments"?  stat.value :  formatMonetaryValue(stat.value)}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>{' '}
                <span className="text-sm text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-6">
          <WeatherWidget />

          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {activity.type === 'transfer' ? (
                          <ArrowPathRoundedSquareIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                        ) : activity.type === 'payment' ? (
                          <BanknotesIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                        ) : (
                          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                        )}
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.type === 'transfer' ? 'Transfer' : activity.type === 'payment' ? 'Payment' : 'Deposit'} to {activity.account}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className={`text-sm font-medium ${activity.amount.toString().startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                          { formatMonetaryValue(activity.amount)}
                        </p>
                        {activity.status === 'pending' ? (
                          <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Pending
                          </span>
                        ) : (
                          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all activity
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Sun Alerts</h3>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  2 Active
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <SunIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Sunrise Payment</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Scheduled for tomorrow at 6:24 AM
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    { formatMonetaryValue(120000)} to Supplier Co.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Sunset Transfer</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Scheduled for today at 7:45 PM
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {formatMonetaryValue(80000)} to Savings Account
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Manage alerts
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                <span className="mt-2">Pay Bills</span>
              </button>
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="mt-2">Statements</span>
              </button>
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="mt-2">Verify Account</span>
              </button>
              <button
                type="button"
                className="inline-flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="mt-2">Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
