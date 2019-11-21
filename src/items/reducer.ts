import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from '../actionTypes'
import { State, Action } from '../types'

export const itemsReducer = createReducer(
  {},
  {
    [ActionTypes.setItems]: (state: State, action: Action) =>
      (state = updateItem(state, action.meta.itemType, action.payload.data)),

    [ActionTypes.updateItem]: (state: State, action: Action) =>
      (state = updateItemById(
        state,
        action.meta.itemType,
        action.payload.id,
        action.payload.data
      )),

    [ActionTypes.setItemData]: (state: State, action: Action) =>
      (state = updateItemByField(
        state,
        action.meta.itemType,
        action.meta.field,
        action.payload.data
      )),

    [ActionTypes.makeActiveItem]: (state: State, action: Action) =>
      (state = updateItemByField(
        state,
        action.meta.itemType,
        'activeItemId',
        action.payload.data
      ))
  }
)

export function updateItem(state: State, itemType: string, data: any): State {
  const items: any = {}
  const itemsOrder: any[] = []
  data.forEach((item: any, index: number) => {
    const id = item.id ? String(item.id) : String(index + 1)
    items[id] = item
    itemsOrder.push(id)
  })
  state = updateItemByField(state, itemType, 'items', items)
  state = updateItemByField(state, itemType, 'itemsOrder', itemsOrder)
  return state
}

function updateItemByField(
  state: State,
  itemType: string,
  field: string,
  data: any
): State {
  const item = state[itemType] ? { ...state[itemType] } : {}
  item[field] = data
  state[itemType] = item
  return state
}

function updateItemById(
  state: State,
  itemType: string,
  id: string,
  data: any
): State {
  const item = state[itemType] ? { ...state[itemType] } : {}
  item.items[String(id)] = data
  state[itemType] = item
  return state
}
