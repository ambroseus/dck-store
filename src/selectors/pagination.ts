import { getItemState } from '../helpers'
import { State } from '../types'

export function getTotalItems(state: State, itemType: string): any {
  return getItemState(state, itemType).totalItems
}

export function getCurrentPage(state: State, itemType: string): any {
  return getItemState(state, itemType).currentPage
}

export function getPageSize(state: State, itemType: string): any {
  return getItemState(state, itemType).pageSize
}
