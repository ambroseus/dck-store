import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from 'actionTypes'
import { reducers } from 'reducers'

const { setItems, setItem, removeItem } = reducers

export const filtersReducer = createReducer(
  {},
  {
    [ActionTypes.setFilters]: setItems,
    [ActionTypes.setFilter]: setItem,
    [ActionTypes.removeFilter]: removeItem,
  }
)