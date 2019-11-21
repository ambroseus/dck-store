import { createAction } from '@reduxjs/toolkit'
import { State, Action } from './types'

export const composeAction = (actionType: string): any => {
  return createAction(actionType, params => {
    const { itemType, field, ...payload } = params
    return { meta: { itemType, field }, payload }
  })
}

export function updateItemByField(
  state: State,
  action: Action,
  field: string
): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { data } = payload
  const item = state[itemType] ? { ...state[itemType] } : {}

  item[field] = data
  state[itemType] = item
  return state
}

export function updateItemById(state: State, action: Action): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { id, data } = payload
  const item = state[itemType] ? { ...state[itemType] } : {}
  if (!Array.isArray(item.items)) return state

  const items = [...item.items]
  const itemIndex = items.findIndex(el => String(el.id) === String(id))
  if (itemIndex === -1) return state

  items[itemIndex] = data
  item.items = items
  state[itemType] = item
  return state
}
