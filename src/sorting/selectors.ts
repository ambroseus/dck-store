import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from 'helpers/selectors'
import { getIndexedItem } from 'items/selectors'
import { State } from 'types'

type getSortFields = (state: State, itemType: string) => any[]
type getSortField = (state: State, itemType: string, field: string) => any
type getSortingState = (state: State, itemType: string) => any

const _getSortingState = getDckState('sorting')

export const getSortingState: getSortingState = createSelector(
  _getSortingState,
  sortingState => sortingState
)

export const getSortFields: getSortFields = createSelector(
  getSortingState,
  sortingState => sortingState.items
)

export const getSortField: getSortField = createSelector(
  [getSortingState, get3rdParam],
  getIndexedItem
)
