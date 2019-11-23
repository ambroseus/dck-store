import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'

// core action creators for items

export function setItems(itemType: string, data?: any[]): Action {
  return composeAction(ActionTypes.setItems)({ itemType, data })
}

export function setItem(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.setItem)({ itemType, id, data })
}

export function removeItem(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.removeItem)({ itemType, id, data })
}

export function setItemData(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setItemData)({ itemType, field, data })
}

export function setActiveItem(itemType: string, id?: string): Action {
  return composeAction(ActionTypes.setActiveItem)({
    itemType,
    data: id
  })
}
