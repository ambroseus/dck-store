import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../utils'

export function setItems(itemType: string, items: any[]): Action {
  return composeAction(ActionTypes.setItems)({ itemType, data: items })
}

export function updateItem(itemType: string, id: string, item: any): Action {
  return composeAction(ActionTypes.updateItem)({ itemType, id, data: item })
}

export function setItemData(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setItemData)({ itemType, field, data })
}

export function makeActiveItem(itemType: string, id: string): Action {
  return composeAction(ActionTypes.makeActiveItem)({
    itemType,
    data: String(id)
  })
}
