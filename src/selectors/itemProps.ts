import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from '../helpers'
import { State } from '../types'

type getItemProp = (state: State, itemType: string, field: string) => any
type getItemPropsState = (state: State, itemType: string) => any

const _getItemPropsState = getDckState('itemProps')

export const getItemPropsState: getItemPropsState = createSelector(
  _getItemPropsState,
  itemPropsState => itemPropsState
)

export const getItemProp: getItemProp = createSelector(
  [getItemPropsState, get3rdParam],
  (itemPropsState, prop) => itemPropsState[prop]
)
