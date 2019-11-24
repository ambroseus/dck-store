import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from '../helpers'
import { getIndexedItem } from './items'
import { State } from '../types'

type getFilters = (state: State, itemType: string) => any[]
type getFilter = (state: State, itemType: string, field: string) => any
type getFiltersState = (state: State, itemType: string) => any

const _getFiltersState = getDckState('filters')

export const getFiltersState: getFiltersState = createSelector(
  _getFiltersState,
  filtersState => filtersState
)

export const getFilters: getFilters = createSelector(
  getFiltersState,
  filtersState => filtersState.items
)

export const getFilter: getFilter = createSelector(
  [getFiltersState, get3rdParam],
  getIndexedItem
)
