import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatMonetaryValue } from '@/helpers/global';

export default function Accounts({ auth }: PageProps) {
  const accounts = [
    {
      id: 1,
      name: 'Main Checking',
      number: '•••• 5678',
      balance: 1234567,
      available: 1224567,
      type: 'checking',
      status: 'active'
    },
    {
      id: 2,
      name: 'Business Savings',
      number: '•••• 9012',
      balance: 4567890,
      available: 4557890,
      type: 'savings',
      status: 'active'
    },
    {
      id: 3,
      name: 'Weather Fund',
      number: '•••• 3456',
      balance: 842000,
      available: 842000,
      type: 'investment',
      status: 'active'
    }
  ];

  const transactions = [
    {
      id: 1,
      date: 'Today',
      description: 'Supplier Payment',
      amount: 120000,
      account: 'Checking •••• 5678',
      status: 'completed'
    },
    {
      id: 2,
      date: 'Yesterday',
      description: 'Client Deposit',
      amount: 350000,
      account: 'Checking •••• 5678',
      status: 'completed'
    },
    {
      id: 3,
      date: 'Mar 15',
      description: 'Interbank Transfer',
      amount: 80000,
      account: 'Savings •••• 9012',
      status: 'pending'
    }
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Accounts" />

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                My Accounts
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Overview of all your Climapay accounts and recent transactions
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                Open New Account
              </button>
            </div>
          </div>
        </div>

        {/* Account cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {accounts.map((account) => (
            <div key={account.id} className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{account.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{account.number}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatMonetaryValue(account.balance)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available: {formatMonetaryValue(account.available)}</p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                  >
                    <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                    Deposit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                  >
                    <ArrowUpTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent transactions */}
        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="ml-2 hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
                            {transaction.account}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className={`text-sm font-medium ${transaction.amount.toString().startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {formatMonetaryValue(transaction.amount)}
                      </p>
                      {transaction.status === 'pending' ? (
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
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all transactions
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
