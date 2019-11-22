import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { reducers } from './reducers'

export const dckReducer = createReducer(
  {},
  {
    //items
    [ActionTypes.setItems]: reducers.setItems,
    [ActionTypes.setItem]: reducers.setItem,
    [ActionTypes.removeItem]: reducers.removeItem,
    [ActionTypes.setItemData]: reducers.setItemData,
    [ActionTypes.setActiveItem]: reducers.setActiveItem,
    //filters
    [ActionTypes.setFilters]: reducers.setItems,
    [ActionTypes.setFilter]: reducers.setItem,
    [ActionTypes.removeFilter]: reducers.removeItem
  }
)
