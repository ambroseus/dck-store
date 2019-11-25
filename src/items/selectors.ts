import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from 'helpers/selectors'
import { State } from 'types'

type getItems = (state: State, itemType: string) => any[]
type getItem = (state: State, itemType: string, id: string) => any
type getActiveItemId = (state: State, itemType: string) => any
type getActiveItem = (state: State, itemType: string) => any

type getItemState = (state: State, itemType: string) => any
type getIndexedItem = (itemState: State, id: string) => any

const _getItemState = getDckState('items')

export const getItemState: getItemState = createSelector(
  _getItemState,
  itemState => itemState
)

export function _getIndexedItem(itemState: State, id: string): any {
  const { items, itemIndex } = itemState
  if (!Array.isArray(items) || !itemIndex) return void 0
  const index = itemIndex[String(id)]
  return index === void 0 ? void 0 : items[index]
}

export const getIndexedItem: getIndexedItem = createSelector(
  _getIndexedItem,
  item => item
)

export const getItems: getItems = createSelector(
  getItemState,
  itemState => itemState.items
)

export const getItem: getItem = createSelector(
  [getItemState, get3rdParam],
  getIndexedItem
)

export const getActiveItemId: getActiveItemId = createSelector(
  getItemState,
  itemState => itemState.activeItemId
)

export const getActiveItem: getActiveItem = createSelector(
  getItemState,
  itemState => getIndexedItem(itemState, itemState.activeItemId)
)

export function isItemSelected(
  state: State,
  itemType: string,
  id: string
): boolean {
  const { selectedItems } = getItemState(state, itemType)
  if (!selectedItems) return false
  return String(id) in selectedItems
}

export function getSelectedItemIds(state: State, itemType: string): string[] {
  const { selectedItems } = getItemState(state, itemType)
  if (!selectedItems) return []
  return Object.keys(selectedItems)
}

export function getSelectedItems(state: State, itemType: string): any[] {
  const { selectedItems, items } = getItemState(state, itemType)
  if (!selectedItems) return []
  const selectedIds = getSelectedItemIds(state, itemType)
  return selectedIds.map((id: string) => items[selectedItems[id]])
}
