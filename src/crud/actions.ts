import { composeAction } from '../helpers/actions'
import { IAction, ActionTypes } from '../types'

// crud action creators for items

export function loadItems(itemType: string): IAction {
  return composeAction(ActionTypes.loadItems)({ itemType })
}
export function addItem(itemType: string, item: any): IAction {
  return composeAction(ActionTypes.addItem)({ itemType, payload: item })
}
export function updateItem(itemType: string, id: string, item: any): IAction {
  return composeAction(ActionTypes.updateItem)({ itemType, id, payload: item })
}
export function deleteItem(itemType: string, id: string): IAction {
  return composeAction(ActionTypes.deleteItem)({ itemType, id })
}
export function importItems(itemType: string): IAction {
  return composeAction(ActionTypes.importItems)({ itemType })
}
export function exportItems(itemType: string): IAction {
  return composeAction(ActionTypes.exportItems)({ itemType })
}
