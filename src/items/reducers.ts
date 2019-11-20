import { createReducer } from '@reduxjs/toolkit'
import { setItems, setItemData } from './actions'
import { State, Action } from '../types'

export const itemsReducer = createReducer(
  {},
  {
    [setItems.toString()]: (state: State, action: Action) => {
      const {
        payload: { data },
        meta: { itemType }
      } = action
      if (!state[itemType]) state[itemType] = {}
      const item = state[itemType]
      item.data = data
    },
    [setItemData.toString()]: (state: State, action: Action) => {
      const {
        payload: { data, field },
        meta: { itemType }
      } = action
      if (!state[itemType]) state[itemType] = {}
      const item = state[itemType]
      item[field] = data
    }
  }
)
