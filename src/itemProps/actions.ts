import { composeAction } from '../helpers/actions'
import { Action, ActionTypes } from '../types'

// action creators for itemProps

export function setItemProp(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setItemProp)({
    itemType,
    field,
    payload: data,
  })
}

export function setTotalItems(itemType: string, totalItems: number): Action {
  return setItemProp(itemType, 'totalItems', totalItems)
}

export function setCurrentPage(itemType: string, currentPage: number): Action {
  return setItemProp(itemType, 'currentPage', currentPage)
}
export function setPageSize(itemType: string, pageSize: number): Action {
  return setItemProp(itemType, 'pageSize', pageSize)
}
