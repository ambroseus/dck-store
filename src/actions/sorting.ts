import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction, sortingType } from '../helpers'

// action creators for sorting

export function setSortFields(itemType: string, sortFields: any[]): Action {
  return composeAction(ActionTypes.setSortFields)({
    itemType: sortingType(itemType),
    payload: sortFields
  })
}

export function setSortField(
  itemType: string,
  field: string,
  sortField: any
): Action {
  return composeAction(ActionTypes.setSortField)({
    itemType: sortingType(itemType),
    field,
    payload: sortField
  })
}

export function removeSortField(itemType: string, field: string): Action {
  return composeAction(ActionTypes.removeSortField)({
    itemType: sortingType(itemType),
    field
  })
}