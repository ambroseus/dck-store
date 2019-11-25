import { ActionTypes } from 'actionTypes'
import { Action } from 'types'
import { composeAction } from 'helpers/actions'

// action creators for filters

export function setFilters(itemType: string, filters: any[]): Action {
  return composeAction(ActionTypes.setFilters)({
    itemType,
    payload: filters,
  })
}

export function setFilter(
  itemType: string,
  field: string,
  filter: any
): Action {
  return composeAction(ActionTypes.setFilter)({
    itemType,
    field,
    payload: filter,
  })
}

export function removeFilter(itemType: string, field: string): Action {
  return composeAction(ActionTypes.removeFilter)({
    itemType,
    field,
  })
}
