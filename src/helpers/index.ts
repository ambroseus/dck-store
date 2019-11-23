import { createAction } from '@reduxjs/toolkit'
import { State, Action } from '../types'

export const isObject = (obj: any) =>
  Boolean(obj) && typeof obj === 'object' && obj.constructor === Object

export const getParams = (state: State, action: Action): State => {
  const { meta, payload } = action
  const { itemType, field, id } = meta
  const { data } = payload
  const itemState = state[itemType] || {}
  return { itemType, field, id, data, itemState }
}

export const getItemKey = (item: any) => {
  return (isObject(item) && (item.id || item.field)) || void 0
}

export const getItemIndex = (items: any[]): State => {
  const itemIndex: any = {}

  if (Array.isArray(items)) {
    items.forEach((item, index) => {
      const key = getItemKey(item)
      if (key !== void 0) itemIndex[String(key)] = index
    })
  }
  return itemIndex
}

export const composeAction = (actionType: string): any => {
  return createAction(actionType, params => {
    const { itemType, id, field, ...payload } = params
    return { meta: { itemType, id, field }, payload }
  })
}
