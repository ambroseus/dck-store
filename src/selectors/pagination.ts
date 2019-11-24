import { getItemProp } from './itemProps'
import { State } from '../types'

export function getTotalItems(state: State, itemType: string): any {
  return getItemProp(state, itemType, 'totalItems')
}

export function getCurrentPage(state: State, itemType: string): any {
  return getItemProp(state, itemType, 'currentPage')
}

export function getPageSize(state: State, itemType: string): any {
  return getItemProp(state, itemType, 'pageSize')
}
