import { PriceType } from './PriceType'

export type EventType = {
  id: string
  title: any
  category: 'Category'
  expiryDate: string
  yesPrice: PriceType
  noPrice: PriceType
  volume: string
}

export type EventModel = {
  id: string
  title: any
  expiryDate: string
  volume: VolumeModel
  currency: string
}

export type VolumeModel = {
  yesBuyVolume: number
  yesSellVolume: number
  noBuyVolume: number
  noSellVolume: number
}

