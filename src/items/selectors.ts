import { State } from '../types'

const emptyState: State = {}

function _getItemState(state: State, itemType: string): any {
  return state?.dck?.items?.[itemType] ?? emptyState
}

function _getItem(itemState: State, id: string): any {
  const { items, itemIndex } = itemState
  if (!Array.isArray(items) || !itemIndex) return void 0
  const index = itemIndex[String(id)]
  return index === void 0 ? void 0 : items[index]
}

export function getItems(state: State, itemType: string): any[] {
  return _getItemState(state, itemType).items
}

export function getItem(state: State, itemType: string, id: string): any {
  return _getItem(_getItemState(state, itemType), id)
}

export function getItemData(
  state: State,
  itemType: string,
  field: string
): any {
  return _getItemState(state, itemType)[field]
}

export function getActiveItemId(state: State, itemType: string): any {
  return _getItemState(state, itemType).activeItemId
}

export function getActiveItem(state: State, itemType: string): any {
  const itemState = _getItemState(state, itemType)
  return _getItem(itemState, itemState.activeItemId)
}
