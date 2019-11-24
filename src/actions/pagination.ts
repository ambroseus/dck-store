import { Action } from '../types'
import { setItemProp } from './items'

// action creators for pagination

export function setTotalItems(itemType: string, totalItems: number): Action {
  return setItemProp(itemType, 'totalItems', totalItems)
}

export function setCurrentPage(itemType: string, currentPage: number): Action {
  return setItemProp(itemType, 'currentPage', currentPage)
}
export function setPageSize(itemType: string, pageSize: number): Action {
  return setItemProp(itemType, 'pageSize', pageSize)
}
