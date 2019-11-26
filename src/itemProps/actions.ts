import { composeAction } from '../helpers/actions'
import { IAction, ActionTypes } from '../types'

// action creators for itemProps

export function setItemProp(
  itemType: string,
  field: string,
  data: any
): IAction {
  return composeAction(ActionTypes.setItemProp)({
    itemType,
    field,
    payload: data,
  })
}

export function setTotalItems(itemType: string, totalItems: number): IAction {
  return setItemProp(itemType, 'totalItems', totalItems)
}

export function setCurrentPage(itemType: string, currentPage: number): IAction {
  return setItemProp(itemType, 'currentPage', currentPage)
}
export function setPageSize(itemType: string, pageSize: number): IAction {
  return setItemProp(itemType, 'pageSize', pageSize)
}
