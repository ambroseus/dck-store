import { createSelector } from '@reduxjs/toolkit'
import { get3rdParam } from '../helpers'
import { State } from '../types'

type getItems = (state: State, itemType: string) => any[]
type getItem = (state: State, itemType: string, id: string) => any
type getActiveItemId = (state: State, itemType: string) => any
type getActiveItem = (state: State, itemType: string) => any

type getItemState = (state: State, itemType: string) => any
type getIndexedItem = (itemState: State, id: string) => any

const emptyState: State = {}

function _getItemState(state: State, itemType: string): any {
  return state?.dck?.items?.[itemType] ?? emptyState
}

export const getItemState: getItemState = createSelector(
  _getItemState,
  itemState => itemState
)

function _getIndexedItem(itemState: State, id: string): any {
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
