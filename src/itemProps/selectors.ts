import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from 'helpers'
import { State } from 'types'

type getItemPropsState = (state: State, itemType: string) => any
type getItemProp = (state: State, itemType: string, field: string) => any
type getTotalItems = (state: State, itemType: string) => any
type getCurrentPage = (state: State, itemType: string) => any
type getPageSize = (state: State, itemType: string) => any

const _getItemPropsState = getDckState('itemProps')

export const getItemPropsState: getItemPropsState = createSelector(
  _getItemPropsState,
  itemPropsState => itemPropsState
)

export const getItemProp: getItemProp = createSelector(
  [getItemPropsState, get3rdParam],
  (itemPropsState, prop) => itemPropsState[prop]
)

export const getTotalItems: getTotalItems = createSelector(
  getItemPropsState,
  itemPropsState => itemPropsState.totalItems
)

export const getCurrentPage: getCurrentPage = createSelector(
  getItemPropsState,
  itemPropsState => itemPropsState.currentPage
)

export const getPageSize: getPageSize = createSelector(
  getItemPropsState,
  itemPropsState => itemPropsState.pageSize
)
