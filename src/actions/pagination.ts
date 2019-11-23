import { Action } from '../types'
import { setItemData } from './items'

// action creators for pagination

export function setTotalItems(itemType: string, totalItems: number): Action {
  return setItemData(itemType, 'totalItems', totalItems)
}

export function setCurrentPage(itemType: string, currentPage: number): Action {
  return setItemData(itemType, 'currentPage', currentPage)
}
export function setPageSize(itemType: string, pageSize: number): Action {
  return setItemData(itemType, 'pageSize', pageSize)
}
