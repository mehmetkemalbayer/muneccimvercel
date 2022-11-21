import { useEffect, useState } from 'react';
import axios from 'axios'
type PriceType = {
  amount: number
  currency: string
}

type SummaryPropsType = {
  price: PriceType | undefined
  title: string
  isBordered: boolean
}
type SummaryDataType = {
  totalValue: PriceType
  totalOpenPositionsValue: PriceType
  freeCashValue: PriceType
}

const Summary = ({price, title, isBordered= false}:SummaryPropsType) => (
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
      {price?.amount} {price?.currency}
    </dd>
  </div>
)

const PortfolioSummary = () => {
  const [data, setData] = useState<SummaryDataType | undefined>(undefined);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get('https://0lwihue84b.execute-api.eu-central-1.amazonaws.com/client/v1/portfolios/summary').then(response => {
      console.log(response.data);
      setData(response.data);
    });
  }

  return (
    <div className="bg-indigo-800 rounded-lg">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-12">
        <dl className="text-left sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <Summary
            key={1}
            title={'Portfolio Value'}
            price={data?.totalValue}
            isBordered={true}
          />
          <Summary
            key={2}
            title={'Open Positions'}
            price={data?.totalOpenPositionsValue}
            isBordered={true}
          />
          <Summary key={3} title={'Cash'} price={data?.freeCashValue} isBordered={true} />
        </dl>
      </div>
    </div>
  )
}

export default PortfolioSummary
