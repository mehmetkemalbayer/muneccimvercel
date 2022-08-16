import PortfolioHistory from 'sections/PortfolioHistory'
import PortfolioSummary from '../sections/PortfolioSummary'
import PositionsSection from '../sections/Positions'

const Portfolio = () => {
  return (
    <div className="max-w-7xl mx-auto my-2 sm:px-6 lg:px-8">
      <PortfolioSummary />
      <PortfolioHistory />
      <PositionsSection />
    </div>
  )
}

export default Portfolio
