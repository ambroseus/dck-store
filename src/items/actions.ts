import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../utils'

export function setItems(itemType: string, data: any[]): Action {
  return composeAction(ActionTypes.setItems)({ itemType, data })
}

export function updateItem(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.updateItem)({ itemType, id, data })
}

export function setItemData(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setItemData)({ itemType, field, data })
}
