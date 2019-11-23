import { getItems, getItem } from './items'
import { filterType } from '../helpers'
import { State } from '../types'

export function getFilters(state: State, itemType: string): any[] {
  return getItems(state, filterType(itemType))
}

export function getFilter(state: State, itemType: string, field: string): any {
  return getItem(state, filterType(itemType), field)
}
