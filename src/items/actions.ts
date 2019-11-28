import { composeAction } from '../helpers/actions'
import { IAction, ActionTypes } from '../types'

// core action creators for items

export function setItems(itemType: string, items?: any[]): IAction {
  return composeAction(ActionTypes.setItems)({ itemType, payload: items })
}

export function setItem(
  itemType: string,
  id: string | number,
  item: any
): IAction {
  return composeAction(ActionTypes.setItem)({ itemType, id, payload: item })
}

export function removeItem(itemType: string, id: string | number): IAction {
  return composeAction(ActionTypes.removeItem)({ itemType, id })
}

export function setActiveItem(
  itemType: string,
  id: string | number | undefined
): IAction {
  return composeAction(ActionTypes.setActiveItem)({
    itemType,
    payload: id,
  })
}

export function setSelectedItem(
  itemType: string,
  id: string | number,
  select: boolean
): IAction {
  return composeAction(ActionTypes.setSelectedItem)({
    itemType,
    id,
    payload: select,
  })
}
