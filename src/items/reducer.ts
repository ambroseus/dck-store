import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { State, Action } from '../types'
import { updateItemByField, updateItemById } from '../utils'

export const itemsReducer = createReducer(
  {},
  {
    [ActionTypes.setItems]: (state: State, action: Action) =>
      (state = updateItemByField(state, action, 'items')),

    [ActionTypes.updateItem]: (state: State, action: Action) =>
      (state = updateItemById(state, action)),

    [ActionTypes.setItemData]: (state: State, action: Action) =>
      (state = updateItemByField(state, action, action.meta.field))
  }
)
