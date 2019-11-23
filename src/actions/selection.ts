import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction } from '../helpers'
import { setItemData } from './items'

// action creators for items selection

export function setSelectedItem(
  itemType: string,
  id: string,
  select: boolean
): Action {
  return composeAction(ActionTypes.setSelectedItem)({
    itemType,
    id,
    payload: select
  })
}

export function setAllItemsSelected(itemType: string, select: boolean): Action {
  return setItemData(itemType, 'allItemsSelected', select)
}
