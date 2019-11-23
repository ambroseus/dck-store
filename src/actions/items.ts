import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'

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

export function setItemData(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setItemData)({
    itemType,
    field,
    payload: data
  })
}

export function setActiveItem(itemType: string, id?: string): Action {
  return composeAction(ActionTypes.setActiveItem)({
    itemType,
    payload: id
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
    payload: select
  })
}
