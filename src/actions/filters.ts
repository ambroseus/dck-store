import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from './helpers'

// action creators for filters

const filterType = (itemType: string) => `${itemType}:filters`

export function setFilters(itemType: string, data: any[]): Action {
  return composeAction(ActionTypes.setFilters)({
    itemType: filterType(itemType),
    data
  })
}

export function updateFilter(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.updateFilter)({
    itemType: filterType(itemType),
    id,
    data
  })
}

export function addFilter(itemType: string, id: string, data: any): Action {
  return composeAction(ActionTypes.addFilter)({
    itemType: filterType(itemType),
    id,
    data
  })
}

export function deleteFilter(itemType: string, id: string): Action {
  return composeAction(ActionTypes.deleteFilter)({
    itemType: filterType(itemType),
    id
  })
}
