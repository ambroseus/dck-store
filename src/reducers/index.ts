import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { reducers } from './reducers'

export const dckReducer = createReducer(
  {},
  {
    //items
    [ActionTypes.setItems]: reducers.setItems,
    [ActionTypes.updateItem]: reducers.updateItem,
    [ActionTypes.addItem]: reducers.addItem,
    [ActionTypes.deleteItem]: reducers.deleteItem,
    [ActionTypes.setItemData]: reducers.setItemData,
    [ActionTypes.setActiveItem]: reducers.setActiveItem,
    //filters
    [ActionTypes.setFilters]: reducers.setItems,
    [ActionTypes.updateFilter]: reducers.updateItem,
    [ActionTypes.addFilter]: reducers.addItem,
    [ActionTypes.deleteFilter]: reducers.deleteItem
  }
)
