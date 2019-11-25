import { composeAction } from '../helpers/actions'
import { Action, ActionTypes } from '../types'

// crud action creators for items

export function loadItems(itemType: string): Action {
  return composeAction(ActionTypes.loadItems)({ itemType })
}
export function addItem(itemType: string, item: any): Action {
  return composeAction(ActionTypes.addItem)({ itemType, payload: item })
}
export function updateItem(itemType: string, id: string, item: any): Action {
  return composeAction(ActionTypes.updateItem)({ itemType, id, payload: item })
}
export function deleteItem(itemType: string, id: string): Action {
  return composeAction(ActionTypes.deleteItem)({ itemType, id })
}
export function importItems(itemType: string): Action {
  return composeAction(ActionTypes.importItems)({ itemType })
}
export function exportItems(itemType: string): Action {
  return composeAction(ActionTypes.exportItems)({ itemType })
}
