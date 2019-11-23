import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'

// action creators for filters

const filterType = (itemType: string): string => `filters:${itemType}`

export function setFilters(itemType: string, data: any[]): Action {
  return composeAction(ActionTypes.setFilters)({
    itemType: filterType(itemType),
    data
  })
}

export function setFilter(itemType: string, field: string, data: any): Action {
  return composeAction(ActionTypes.setFilter)({
    itemType: filterType(itemType),
    id: field,
    data
  })
}

export function removeFilter(itemType: string, field: string): Action {
  return composeAction(ActionTypes.removeFilter)({
    itemType: filterType(itemType),
    id: field
  })
}
