type PriceType = {
  amount: number
  currency: string
}

type SummaryPropsType = {
  title: string
  price: PriceType
  isBordered?: boolean
}

const Summary = ({ title, price, isBordered = false }: SummaryPropsType) => (
  <div
    className={`flex flex-col pt-4 pb-6 sm:py-4 ${
      isBordered &&
      'border-b-2 sm:border-b-0 sm:border-r-2 border-opacity-20 border-white'
    }`}
  >
    <dt className="order-1 text-lg leading-8 font-medium text-indigo-200">
      {title}
    </dt>
    <dd className="order-2 text-4xl tracking-tight font-bold text-white">
      {price.currency}
      {price.amount}
    </dd>
  </div>
)

const PortfolioSummary = () => {
  return (
    <div className="bg-indigo-800 rounded-lg">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-12">
        <dl className="text-left sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <Summary
            title={'Portfolio Value'}
            price={{ currency: '€', amount: 1.04 }}
            isBordered
          />
          <Summary
            title={'Open Positions'}
            price={{ currency: '€', amount: 1.04 }}
            isBordered
          />
          <Summary title={'Cash'} price={{ currency: '€', amount: 1.04 }} />
        </dl>
      </div>
    </div>
  )
}

export default PortfolioSummary
