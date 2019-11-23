import { setItemData } from '../actions/items'
import { State, Action } from '../types'
import { getParams, getItemIndex, reservedFields } from '../helpers'

// case reducers are implicitly wrapped with immer
// so we have "mutative" immutable update logic

class MutativeReducers {
  setItems(state: State, action: Action) {
    state = setItemsWithIndex(state, action)
  }
  setItem(state: State, action: Action) {
    state = updateOrAppendItemByKey(state, action)
  }
  removeItem(state: State, action: Action) {
    state = removeItemByKey(state, action)
  }
  setItemData(state: State, action: Action) {
    const { field } = action.meta
    if (!reservedFields.includes(field))
      state = updateItemByField(state, action, field)
  }
  setActiveItem(state: State, action: Action) {
    state = updateItemByField(state, action, 'activeItemId')
  }
  selectItem(state: State, action: Action) {
    state = selectOrUnselectItemByKey(state, action)
  }
}

export const reducers = new MutativeReducers()

function setItemsWithIndex(state: State, action: Action): State {
  const { itemType, data } = getParams(state, action)
  state = updateItemByField(state, action, 'items')

  const itemIndex = getItemIndex(data)
  action = setItemData(itemType, 'itemIndex', itemIndex)
  state = updateItemByField(state, action, 'itemIndex')

  action = setItemData(itemType, 'selectedItems', {})
  state = updateItemByField(state, action, 'selectedItems')

  return state
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
  let { items, itemIndex, selectedItems } = itemState
  const index = itemIndex ? itemIndex[key] : void 0
  if (index === void 0 || !Array.isArray(items)) return state

  items.splice(index, 1)
  delete itemIndex[key]
  if (selectedItems) delete selectedItems[key]

  itemState.items = items
  itemState.itemIndex = itemIndex
  itemState.selectedItems = selectedItems
  state[itemType] = itemState
  return state
}

function selectOrUnselectItemByKey(state: State, action: Action): State {
  const { itemType, id, field, data: select, itemState } = getParams(
    state,
    action
  )
  if (!id && !field) return state

  const key: string = String(id || field)
  let { selectedItems, itemIndex } = itemState
  if (!selectedItems) selectedItems = {}

  select ? (selectedItems[key] = itemIndex[key]) : delete selectedItems[key]

  itemState.selectedItems = selectedItems
  state[itemType] = itemState
  return state
}
