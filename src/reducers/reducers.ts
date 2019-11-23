import { setItemData } from '../actions/items'
import { State, Action } from '../types'
import { getParams, getItemIndex } from '../helpers'

// case reducers are implicitly wrapped with immer
// so we have "mutative" immutable update logic

class MutativeReducers {
  setItems(state: State, action: Action) {
    const { itemType, data } = getParams(state, action)
    state = updateItemByField(state, action, 'items')
    const itemIndex = getItemIndex(data)
    action = setItemData(itemType, 'itemIndex', itemIndex)
    state = updateItemByField(state, action, 'itemIndex')
  }

  setItem(state: State, action: Action) {
    state = updateOrAppendItemByKey(state, action)
  }

  removeItem(state: State, action: Action) {
    state = removeItemByKey(state, action)
  }

  setItemData(state: State, action: Action) {
    state = updateItemByField(state, action, action.meta.field)
  }

  setActiveItem(state: State, action: Action) {
    state = updateItemByField(state, action, 'activeItemId')
  }
}

function updateItemByField(state: State, action: Action, field: string): State {
  const { itemType, data, itemState } = getParams(state, action)
  itemState[field] = data
  state[itemType] = itemState
  return state
}

function updateOrAppendItemByKey(state: State, action: Action): State {
  const { itemType, data, id, field, itemState } = getParams(state, action)
  if (!id && !field) return state

  const key: string = String(id || field)
  let { items, itemIndex } = itemState
  const index = itemIndex ? itemIndex[key] : void 0

  if (index !== void 0 && Array.isArray(items)) {
    // update existing item
    items[index] = data
  } else {
    // append new item
    if (!Array.isArray(items)) items = []
    if (!itemIndex) itemIndex = {}
    itemIndex[key] = items.length
    items.push(data)
  }

  itemState.items = items
  itemState.itemIndex = itemIndex
  state[itemType] = itemState
  return state
}

function removeItemByKey(state: State, action: Action): State {
  const { itemType, id, field, itemState } = getParams(state, action)
  if (!id && !field) return state

  const key: string = String(id || field)
  let { items, itemIndex } = itemState
  const index = itemIndex ? itemIndex[key] : void 0
  if (index === void 0 || !Array.isArray(items)) return state

  items.splice(index, 1)
  delete itemIndex[key]
  itemState.items = items
  itemState.itemIndex = itemIndex
  state[itemType] = itemState
  return state
}

export const reducers = new MutativeReducers()
