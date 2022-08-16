import { PriceType } from './PriceType'

export type EventType = {
  id: string
  title: string
  category: 'Category'
  expiryDate: string
  yesPrice: PriceType
  noPrice: PriceType
  volume: string
}
