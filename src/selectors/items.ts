import { createSelector } from '@reduxjs/toolkit'
import { getItemState, getIndexedItem, get3rdParam } from '../helpers'
import { State } from '../types'

type getItems = (state: State, itemType: string) => any[]
type getItem = (state: State, itemType: string, id: string) => any
type getItemProp = (state: State, itemType: string, field: string) => any
type getActiveItemId = (state: State, itemType: string) => any
type getActiveItem = (state: State, itemType: string) => any

export const getItems: getItems = createSelector(
  getItemState,
  itemState => itemState.items
)

export const getItem: getItem = createSelector(
  [getItemState, get3rdParam],
  getIndexedItem
)

export const getItemProp: getItemProp = createSelector(
  [getItemState, get3rdParam],
  (itemState, prop) => itemState[prop]
)

export const getActiveItemId: getActiveItemId = createSelector(
  getItemState,
  itemState => itemState.activeItemId
)

export const getActiveItem: getActiveItem = createSelector(
  getItemState,
  itemState => getIndexedItem(itemState, itemState.activeItemId)
)
