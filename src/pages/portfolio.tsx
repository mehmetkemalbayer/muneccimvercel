import PortfolioSummary from '../sections/PortfolioSummary'
import PositionsSection from '../sections/Positions'

const Portfolio = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <PortfolioSummary />
      <PositionsSection />
    </div>
  )
}

export default Portfolio
