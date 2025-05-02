import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import {
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatMonetaryValue } from '@/helpers/global';

export default function Analytics({ auth }: PageProps) {
  const stats = [
    { name: 'Total Revenue', value: 8945623, change: '12%', changeType: 'increase' },
    { name: 'Total Expenses', value: 4523189, change: '8%', changeType: 'increase' },
    { name: 'Profit Margin', value: '32.5%', change: '4%', changeType: 'increase' },
    { name: 'Weather Impact', value: '18.2%', change: '2%', changeType: 'decrease' },
  ];

  const transactions = [
    { name: 'Sunrise Payments', value: 12, change: '3%', changeType: 'increase' },
    { name: 'Sunset Payments', value: 8, change: '1%', changeType: 'increase' },
    { name: 'Weather Delays', value: 5, change: '2%', changeType: 'decrease' },
    { name: 'Seasonal Adjustments', value: 7, change: '1%', changeType: 'increase' },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Analytics" />

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Financial Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Insights into your financial performance and weather impacts
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
              >
                <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CurrencyDollarIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{stat.name == "Profit Margin" || stat.name == "Weather Impact" ? stat.value : formatMonetaryValue(stat.value)}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`flex items-center text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
          {/* Revenue Chart */}
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Revenue Trends</h3>
            </div>
            <div className="p-6 h-80 flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Revenue Chart</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Visual representation of revenue data</p>
              </div>
            </div>
          </div>

          {/* Expenses Chart */}
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Expense Breakdown</h3>
            </div>
            <div className="p-6 h-80 flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Expenses Chart</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Visual representation of expenses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Impact */}
        <div className="rounded-lg bg-white shadow dark:bg-gray-800 mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Weather Impact Analysis</h3>
          </div>
          <div className="p-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg dark:ring-gray-600">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      Metric
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Value
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                  {transactions.map((item) => (
                    <tr key={item.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item.value}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center ${item.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {item.changeType === 'increase' ? (
                            <ArrowUpIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                          )}
                          {item.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Weather Impact Chart */}
        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Weather Impact on Transactions</h3>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Weather Impact Chart</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Visual representation of weather impacts</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
