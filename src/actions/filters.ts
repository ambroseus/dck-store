import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'

// action creators for filters

const filterType = (itemType: string): string => `filters:${itemType}`

export function setFilters(itemType: string, filters: any[]): Action {
  return composeAction(ActionTypes.setFilters)({
    itemType: filterType(itemType),
    payload: filters
  })
}

export function setFilter(
  itemType: string,
  field: string,
  filter: any
): Action {
  return composeAction(ActionTypes.setFilter)({
    itemType: filterType(itemType),
    field,
    payload: filter
  })
}

export function removeFilter(itemType: string, field: string): Action {
  return composeAction(ActionTypes.removeFilter)({
    itemType: filterType(itemType),
    field
  })
}
