import { createAction } from '@reduxjs/toolkit'
import { State, Action } from '../types'

export const filterType = (itemType: string): string => `filters:${itemType}`
export const sortingType = (itemType: string): string => `sorting:${itemType}`
export const processType = (itemType: string): string => `process:${itemType}`

export const isObject = (obj: any) =>
  Boolean(obj) && typeof obj === 'object' && obj.constructor === Object

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
    const { itemType, id, field, payload } = params
    return { meta: { itemType, id, field }, payload }
  })
}

export const getParams = (state: State, action: Action): State => {
  const { meta, payload } = action
  const { itemType, field, id } = meta
  const itemState = state[itemType] || {}
  return { itemType, field, id, data: payload, itemState }
}

export const get3rdParam = (...args: any[]) => args[2]
