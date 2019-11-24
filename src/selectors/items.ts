import { getItemState, getIndexedItem } from '../helpers'
import { State } from '../types'

export function getItems(state: State, itemType: string): any[] {
  return getItemState(state, itemType).items
}

export function getItem(state: State, itemType: string, id: string): any {
  return getIndexedItem(getItemState(state, itemType), id)
}

export function getItemProp(
  state: State,
  itemType: string,
  field: string
): any {
  return getItemState(state, itemType)[field]
}

export function getActiveItemId(state: State, itemType: string): any {
  return getItemState(state, itemType).activeItemId
}

export function getActiveItem(state: State, itemType: string): any {
  const itemState = getItemState(state, itemType)
  return getIndexedItem(itemState, itemState.activeItemId)
}
