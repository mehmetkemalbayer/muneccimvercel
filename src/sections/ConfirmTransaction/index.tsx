import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type ConfirmTransactionProps = {
  open: boolean,
  onEditOrder: () => void,
  onConfirm: () => void,
  onCancel: () => void,
}

const ConfirmTransaction = ({ open, onEditOrder, onConfirm, onCancel} : React.PropsWithChildren<ConfirmTransactionProps>) => {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Confirm Transaction
                    </Dialog.Title>

                    <dl className="text-sm font-medium text-gray-500 mt-10 space-y-3">
                      <div className="flex justify-between">
                        <dt>LP Fee</dt>
                        <dd className="text-gray-900">1.80%</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="flex">Your Avg. Price</dt>
                        <dd className="text-gray-900">$0.58</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Estimated Shares Bought</dt>
                        <dd className="text-gray-900">171</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Maximum Winnings</dt>
                        <dd className="text-gray-900">$171</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Max Return on investment</dt>
                        <dd className="text-gray-900">71.12%</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={onConfirm}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={onEditOrder}
                    ref={cancelButtonRef}
                  >
                    Edit Order
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ConfirmTransaction
