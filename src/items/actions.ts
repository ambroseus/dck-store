import { ActionTypes } from 'actionTypes'
import { Action } from 'types'
import { composeAction } from 'helpers/actions'

// core action creators for items

export function setItems(itemType: string, items?: any[]): Action {
  return composeAction(ActionTypes.setItems)({ itemType, payload: items })
}

export function setItem(itemType: string, id: string, item: any): Action {
  return composeAction(ActionTypes.setItem)({ itemType, id, payload: item })
}

export function removeItem(itemType: string, id: string): Action {
  return composeAction(ActionTypes.removeItem)({ itemType, id })
}

export function setActiveItem(itemType: string, id?: string): Action {
  return composeAction(ActionTypes.setActiveItem)({
    itemType,
    payload: id,
  })
}

export function setSelectedItem(
  itemType: string,
  id: string,
  select: boolean
): Action {
  return composeAction(ActionTypes.setSelectedItem)({
    itemType,
    id,
    payload: select,
  })
}

export function loadItems(itemType: string): Action {
  return composeAction(ActionTypes.loadItems)({ itemType })
}
export function addItems(itemType: string): Action {
  return composeAction(ActionTypes.addItems)({ itemType })
}
export function updateItems(itemType: string): Action {
  return composeAction(ActionTypes.updateItems)({ itemType })
}
export function deleteItems(itemType: string): Action {
  return composeAction(ActionTypes.deleteItems)({ itemType })
}
export function importItems(itemType: string): Action {
  return composeAction(ActionTypes.importItems)({ itemType })
}
export function exportItems(itemType: string): Action {
  return composeAction(ActionTypes.exportItems)({ itemType })
}