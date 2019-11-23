import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { reducers } from './reducers'

const {
  setItems,
  setItem,
  removeItem,
  setItemData,
  setActiveItem,
  setSelectedItem
} = reducers

export const dckReducer = createReducer(
  {},
  {
    // items
    [ActionTypes.setItems]: setItems,
    [ActionTypes.setItem]: setItem,
    [ActionTypes.removeItem]: removeItem,
    [ActionTypes.setItemData]: setItemData,
    [ActionTypes.setActiveItem]: setActiveItem,
    [ActionTypes.setSelectedItem]: setSelectedItem,
    // filters
    [ActionTypes.setFilters]: setItems,
    [ActionTypes.setFilter]: setItem,
    [ActionTypes.removeFilter]: removeItem,
    // sorting
    [ActionTypes.setSortFields]: setItems,
    [ActionTypes.setSortField]: setItem,
    [ActionTypes.removeSortField]: removeItem
  }
)
