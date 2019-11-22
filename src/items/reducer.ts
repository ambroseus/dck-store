import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { setItemData } from './actions'
import { State, Action } from '../types'

// case reducers are implicitly wrapped with immer
// so we have "mutative" immutable update logic
export const itemsReducer = createReducer(
  {},
  {
    [ActionTypes.setItems]: (state: State, action: Action) => {
      state = updateItemByField(state, action, 'items')
      const items = action.payload.data
      if (!Array.isArray(items)) return void 0

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

function updateItemByField(state: State, action: Action, field: string): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { data } = payload
  const item = state[itemType] ? { ...state[itemType] } : {}

  item[field] = data
  state[itemType] = item
  return state
}

function updateItemById(state: State, action: Action): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { id, data } = payload
  const itemState = state[itemType] ? { ...state[itemType] } : {}
  const { items, itemIndex } = itemState
  if (!Array.isArray(items) || !itemIndex) return state

  const index = itemIndex[String(id)]
  if (index !== void 0) items[index] = data
  return state
}
