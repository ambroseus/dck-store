import { getItems, getItem } from './items'
import { sortingType } from '../helpers'
import { State } from '../types'

export function getSortFields(state: State, itemType: string): any[] {
  return getItems(state, sortingType(itemType))
}

export function getSortField(
  state: State,
  itemType: string,
  field: string
): any {
  return getItem(state, sortingType(itemType), field)
}
