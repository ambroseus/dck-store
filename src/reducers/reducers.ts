import { setItemData } from '../actions/items'
import { State, Action } from '../types'

// case reducers are implicitly wrapped with immer
// so we have "mutative" immutable update logic

export const reducers: any = {
  setItems: (state: State, action: Action) => {
    state = updateItemByField(state, action, 'items')
    const items = action.payload.data
    if (!Array.isArray(items)) return void 0

    const itemIndex: any = {}
    items.forEach((el, index) => (itemIndex[String(el.id)] = index))
    action = setItemData(action.meta.itemType, 'itemIndex', itemIndex)
    state = updateItemByField(state, action, 'itemIndex')
  },

  setItem: (state: State, action: Action) =>
    (state = updateItemById(state, action)),

  setItemData: (state: State, action: Action) =>
    (state = updateItemByField(state, action, action.meta.field)),

  setActiveItem: (state: State, action: Action) =>
    (state = updateItemByField(state, action, 'activeItemId'))
}

function updateItemByField(state: State, action: Action, field: string): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { data } = payload
  const itemState = state[itemType] ? { ...state[itemType] } : {}

  itemState[field] = data
  state[itemType] = itemState
  return state
}

function updateItemById(state: State, action: Action): State {
  const { meta, payload } = action
  const { itemType } = meta
  const { id, data } = payload
  if (!id) return state

  const itemState = state[itemType] ? { ...state[itemType] } : {}
  let { items, itemIndex } = itemState
  const index = itemIndex ? itemIndex[String(id)] : void 0

  if (index !== void 0 && Array.isArray(items)) {
    // update existing item
    items[index] = data
  } else {
    // append new item
    if (!Array.isArray(items)) items = []
    if (!itemIndex) itemIndex = {}
    itemIndex[String(id)] = items.length
    items.push(data)
    itemState.items = items
    itemState.itemIndex = itemIndex
    state[itemType] = itemState
  }
  return state
}
