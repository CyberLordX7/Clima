import { useState } from 'react';
import { XMarkIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatMonetaryValue } from '@/helpers/global';
import { accessbank, firstbank, gtbank, wemabank } from '@/images';

interface TransferFlowProps {
  type: 'interbank' | 'intrabank';
  onClose: () => void;
}

const banks = [
  { id: 1, name: 'Access Bank', logo: accessbank },
  { id: 2, name: 'Wema Bank', logo: wemabank },
  { id: 3, name: 'First Bank', logo: firstbank },
  { id: 4, name: 'GtBank', logo: gtbank},
];

const accounts = [
  { id: 1, name: 'Checking', number: '•••• 5678', balance: 1234567 },
  { id: 2, name: 'Savings', number: '•••• 9012', balance: 4567890},
];

export default function TransferFlow({ type, onClose }: TransferFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [fromAccount, setFromAccount] = useState<number | null>(null);
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
        // make paystack api call to fetch bank
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(4);
    }, 1500);
  };

  const resetForm = () => {
    setSelectedBank(null);
    setFromAccount(null);
    setToAccount('');
    setAmount('');
    setDescription('');
    setIsSuccess(false);
    setStep(1);
  };

  const handleNewTransfer = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                {type === 'interbank' ? 'Interbank Transfer' : 'Intrabank Transfer'}
              </h3>
              <button
                type="button"
                className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6">
              <nav aria-label="Progress">
                <ol className="flex items-center">
                  <li className={`relative pr-8 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step > 1 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    </div>
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      {step > 1 ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : (
                        <span className="text-sm font-medium text-white">1</span>
                      )}
                    </div>
                  </li>
                  <li className={`relative pr-8 ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step > 2 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    </div>
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      {step > 2 ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : (
                        <span className="text-sm font-medium text-white">2</span>
                      )}
                    </div>
                  </li>
                  <li className={`relative pr-8 ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step > 3 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`} />
                    </div>
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      {step > 3 ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : (
                        <span className="text-sm font-medium text-white">3</span>
                      )}
                    </div>
                  </li>
                  <li className={`relative ${step >= 4 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      <span className="text-sm font-medium text-white">4</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {step === 1 && type === 'interbank' && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Select recipient bank</h4>
                <div className="grid grid-cols-2 gap-4">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => {
                        setSelectedBank(bank.id);
                        setStep(2);
                      }}
                      className={`flex flex-col items-center justify-center rounded-lg border p-4 ${selectedBank === bank.id ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'}`}
                    >
                      <img src={bank.logo} alt={bank.name} className="h-10 w-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{bank.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(step === 1 && type === 'intrabank') || (step === 2 && type === 'interbank') && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Select source account</h4>
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => {
                        setFromAccount(account.id);
                        setStep(3);
                      }}
                      className={`w-full text-left rounded-lg border p-4 ${fromAccount === account.id ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{account.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{account.number}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{account.balance}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {type === 'interbank' ? 'Recipient Account Number' : 'Recipient Account'}
                    </label>
                    <input
                      type="text"
                      id="toAccount"
                      value={toAccount}
                      onChange={(e) => setToAccount(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder={type === 'interbank' ? 'Enter account number' : 'Select recipient'}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">NGN</span>
                      </div>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:text-gray-400"
                        >
                          <option>NGN</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g. Rent payment"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Review Transfer'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="mt-6 text-center">
                {isSuccess ? (
                  <>
                    <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" aria-hidden="true" />
                    <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Transfer Successful!</h3>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>From:</span>
                        <span>Checking •••• 5678</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span>To:</span>
                        <span>{toAccount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span>Amount:</span>
                        <span className="font-medium">{ formatMonetaryValue(amount)}</span>
                      </div>
                      {description && (
                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                          <span>Description:</span>
                          <span>{description}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span>Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handleNewTransfer}
                        className="rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Make Another Transfer
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review Transfer</h3>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-left">
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>From:</span>
                        <span>Checking •••• 5678</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span>To:</span>
                        <span>{toAccount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <span>Amount:</span>
                        <span className="font-medium">{formatMonetaryValue(amount)}</span>
                      </div>
                      {description && (
                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-1">
                          <span>Description:</span>
                          <span>{description}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {isSubmitting ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          'Confirm Transfer'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
