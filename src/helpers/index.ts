import { createAction, createSelector } from '@reduxjs/toolkit'
import { State, Action } from '../types'

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

type getDckState = (block: string) => any

const emptyState: State = {}

function _getDckState(block: string): any {
  return function(state: State, itemType: string): any {
    state?.dck?.[block]?.[itemType] ?? emptyState
  }
}

export const getDckState: getDckState = createSelector(
  _getDckState,
  dckState => dckState
)
