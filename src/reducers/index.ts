/* istanbul ignore file */
import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ActionTypes } from '../actionTypes'
import { reducers } from './reducers'

const {
  setItems,
  setItem,
  removeItem,
  setItemProp,
  setActiveItem,
  setSelectedItem,
} = reducers

export const itemsReducer = createReducer(
  {},
  {
    [ActionTypes.setItems]: setItems,
    [ActionTypes.setItem]: setItem,
    [ActionTypes.removeItem]: removeItem,
    [ActionTypes.setActiveItem]: setActiveItem,
    [ActionTypes.setSelectedItem]: setSelectedItem,
  }
)

export const itemPropsReducer = createReducer(
  {},
  {
    [ActionTypes.setItemProp]: setItemProp,
  }
)

export const filtersReducer = createReducer(
  {},
  {
    [ActionTypes.setFilters]: setItems,
    [ActionTypes.setFilter]: setItem,
    [ActionTypes.removeFilter]: removeItem,
  }
)

export const sortingReducer = createReducer(
  {},
  {
    [ActionTypes.setSortFields]: setItems,
    [ActionTypes.setSortField]: setItem,
    [ActionTypes.removeSortField]: removeItem,
  }
)

export const processesReducer = createReducer(
  {},
  {
    [ActionTypes.processStart]: setItemProp,
    [ActionTypes.processReset]: setItemProp,
    [ActionTypes.processStop]: setItemProp,
    [ActionTypes.processFail]: setItemProp,
  }
)

export const dckReducer = combineReducers({
  items: itemsReducer,
  itemProps: itemPropsReducer,
  filters: filtersReducer,
  sorting: sortingReducer,
  processes: processesReducer,
})
