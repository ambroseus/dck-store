import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { setItemData } from './actions'
import { State, Action } from '../types'
import { updateItemByField, updateItemById } from '../utils'

export const itemsReducer = createReducer(
  {},
  {
    [ActionTypes.setItems]: (state: State, action: Action) => {
      state = updateItemByField(state, action, 'items')
      const items = action.payload.data
      if (!Array.isArray(items)) return

      const itemIndex: any = {}
      items.forEach((el, index) => (itemIndex[String(el.id)] = index))
      action = setItemData(action.meta.itemType, 'itemIndex', itemIndex)
      state = updateItemByField(state, action, 'itemIndex')
    },

    [ActionTypes.updateItem]: (state: State, action: Action) =>
      (state = updateItemById(state, action)),

    [ActionTypes.setItemData]: (state: State, action: Action) =>
      (state = updateItemByField(state, action, action.meta.field)),

    [ActionTypes.makeActiveItem]: (state: State, action: Action) =>
      (state = updateItemByField(state, action, 'activeItemId'))
  }
)
