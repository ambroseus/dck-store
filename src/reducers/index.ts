import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { reducers } from './reducers'

const {
  setItems,
  setItem,
  removeItem,
  setItemProp,
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
    [ActionTypes.setItemProp]: setItemProp,
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
