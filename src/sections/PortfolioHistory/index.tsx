import Chart from '@/components/Chart'
import chartMock from '@/mock/chartMock'

const PortfolioHistory = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-4">
      <div>
        <h2 className="text-xl">My Investment</h2>
        <h2 className="text-xl text-green-400">$408,508</h2>
      </div>
      <Chart data={chartMock} />
    </div>
  )
}

export default PortfolioHistory
