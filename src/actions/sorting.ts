import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'

// action creators for sorting

const sortingType = (itemType: string): string => `sorting:${itemType}`

export function setSortFields(itemType: string, data: any[]): Action {
  return composeAction(ActionTypes.setFilters)({
    itemType: sortingType(itemType),
    data
  })
}

export function setSortField(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction(ActionTypes.setFilter)({
    itemType: sortingType(itemType),
    field,
    data
  })
}

export function removeSortField(itemType: string, field: string): Action {
  return composeAction(ActionTypes.removeFilter)({
    itemType: sortingType(itemType),
    field
  })
}
