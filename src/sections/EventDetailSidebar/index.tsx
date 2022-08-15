import { Tab, RadioGroup } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { classNames } from '../../shared/utils'
import ConfirmTransaction from '../ConfirmTransaction'
import TransactionSuccess from '../TransactionSuccess'

const plans = [
  {
    name: 'Democratic',
    price: '$0.57',
  },
  {
    name: 'Republician',
    price: '$0.43',
  },
]

type PayButtonProps = {
  onClick: () => void,
}

const PayButton = ({ children, onClick }: React.PropsWithChildren<PayButtonProps>) => (
  <button
    type="submit"
    onClick={onClick}
    className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
  </button>
)

const CustomTab = ({ children }: React.PropsWithChildren) => (
  <Tab as={Fragment}>
    {({ selected }) => (
      <button
        className={classNames(
          selected
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:text-gray-700',
          'px-3 py-2 font-medium text-sm rounded-md'
        )}
      >
        {children}
      </button>
    )}
  </Tab>
)

type TradeContainerProps = {
  type?: 'buy' | 'sell'
  showConfirmation: () => void
}

const TradeContainer = ({
  type = 'buy',
  showConfirmation
}: React.PropsWithChildren<TradeContainerProps>) => {
  const [selected, setSelected] = useState(plans[0])

  return (
    <>
      <div className="mb-4 pb-2 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Pick Outcome
        </h3>
      </div>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Pick Outcome</RadioGroup.Label>
        <div className="space-y-4">
          {plans.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                  'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="text-sm flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="font-medium text-gray-900"
                      >
                        {plan.name}
                      </RadioGroup.Label>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right"
                  >
                    <span className="font-medium text-gray-900">
                      {plan.price}
                    </span>
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'absolute -inset-px rounded-lg pointer-events-none'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="my-4 pb-2 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {type === 'buy' ? 'USDC Amount' : 'Shares Amount'}
        </h3>
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            aria-describedby="price-currency"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              USD
            </span>
          </div>
        </div>
      </div>

      <dl className="text-sm font-medium text-gray-500 mt-10 space-y-3">
        <div className="flex justify-between">
          <dt>LP Fee</dt>
          <dd className="text-gray-900">1.80%</dd>
        </div>
        <div className="flex justify-between">
          <dt className="flex">Your Avg. Price</dt>
          <dd className="text-gray-900">$0.58</dd>
        </div>
        {type === 'buy' && (
          <>
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
          </>
        )}

        {type === 'sell' && (
          <>
            <div className="flex justify-between">
              <dt>Remaining Shares</dt>
              <dd className="text-gray-900">-1,000.00</dd>
            </div>
            <div className="flex justify-between">
              <dt>You&apos;ll Receive</dt>
              <dd className="text-gray-900">$563</dd>
            </div>
          </>
        )}
      </dl>

      <PayButton onClick={showConfirmation}>Sign Up To Trade</PayButton>
    </>
  )
}

const EventDetailSidebar = () => {

  type OrderStatuses = 'INITIAL' | 'WAITING_CONFIRMATION' | 'EDITING' | 'SUCCESS';

  const [orderStatus, setOrderStatus] = useState<OrderStatuses>('INITIAL')

  const showConfirmation = () => setOrderStatus('WAITING_CONFIRMATION');
  const showEdit = () => setOrderStatus('EDITING');
  const showSuccess = () => setOrderStatus('SUCCESS');
  const showInitial = () => setOrderStatus('INITIAL');

  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <Tab.Group>
          <Tab.List className="space-x-4 mb-4">
            <CustomTab>Buy</CustomTab>
            <CustomTab>Sell</CustomTab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <TradeContainer showConfirmation={showConfirmation} />
            </Tab.Panel>
            <Tab.Panel>
              <TradeContainer type="sell" showConfirmation={showConfirmation} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <ConfirmTransaction open={orderStatus === 'WAITING_CONFIRMATION'} onEditOrder={showEdit} onConfirm={showSuccess} onCancel={showInitial} />
        <TransactionSuccess open={orderStatus === 'SUCCESS'} onCancel={showInitial} />
      </div>
    </section>
  )
}

export default EventDetailSidebar
