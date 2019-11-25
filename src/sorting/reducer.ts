import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from 'actionTypes'
import { reducers } from 'reducers'

const { setItems, setItem, removeItem } = reducers

export const sortingReducer = createReducer(
  {},
  {
    [ActionTypes.setSortFields]: setItems,
    [ActionTypes.setSortField]: setItem,
    [ActionTypes.removeSortField]: removeItem,
  }
)
