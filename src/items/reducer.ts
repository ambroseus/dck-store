import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { reducers } from '../reducers'

const {
  setItems,
  setItem,
  removeItem,
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
