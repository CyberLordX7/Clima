import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatMonetaryValue } from '@/helpers/global';

export default function Payments({ auth }: PageProps) {
  const scheduledPayments = [
    {
      id: 1,
      name: 'Office Rent',
      amount: 250000,
      date: 'Apr 1, 2023',
      frequency: 'Monthly',
      account: 'Checking •••• 5678',
      status: 'active'
    },
    {
      id: 2,
      name: 'Cloud Services',
      amount: 35000,
      date: 'Apr 5, 2023',
      frequency: 'Monthly',
      account: 'Checking •••• 5678',
      status: 'active'
    },
    {
      id: 3,
      name: 'Marketing Agency',
      amount: 180000,
      date: 'Apr 15, 2023',
      frequency: 'Bi-weekly',
      account: 'Checking •••• 5678',
      status: 'paused'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      name: 'Office Rent',
      amount: 250000,
      date: 'Mar 1, 2023',
      account: 'Checking •••• 5678',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Cloud Services',
      amount: 35000,
      date: 'Mar 5, 2023',
      account: 'Checking •••• 5678',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Supplier Payment',
      amount: 120000,
      date: 'Mar 12, 2023',
      account: 'Checking •••• 5678',
      status: 'failed'
    }
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Payments" />

      <div className="px-4 sm:px-6 lg:px-8 h-screen">
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Payments
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your scheduled payments and payment history
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                New Payment
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Scheduled Payments</h2>
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
            </Link>
          </div>

          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg dark:ring-gray-600">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Payment
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Next Payment
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Frequency
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Account
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                {scheduledPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                      {payment.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      { formatMonetaryValue(payment.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.frequency}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.account}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {payment.status === 'active' ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Paused
                        </span>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href="#"
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Payment History</h2>
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
            </Link>
          </div>

          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg dark:ring-gray-600">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Payment
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Account
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                      {payment.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      { formatMonetaryValue(payment.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.account}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {payment.status === 'completed' ? (
                        <span className="inline-flex items-center text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="h-5 w-5 mr-1" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-600 dark:text-red-400">
                          <XCircleIcon className="h-5 w-5 mr-1" />
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
