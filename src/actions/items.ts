import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from './helpers'

// core action creators for items

export function setItems(itemType: string, data: any[]): Action {
  return composeAction(ActionTypes.setItems)({ itemType, data })
}

export function updateItem(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.updateItem)({ itemType, id, data })
}

export function addItem(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.addItem)({
    itemType,
    id,
    data
  })
}

export function deleteItem(itemType: string, id: string): Action {
  return composeAction(ActionTypes.deleteItem)({
    itemType,
    id
  })
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
