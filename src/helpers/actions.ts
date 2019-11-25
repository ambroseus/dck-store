import { createAction } from '@reduxjs/toolkit'
import { ActionTypes } from 'actionTypes'
import { Action } from 'types'

/*
helpers for take* sagas effects

without helper:
  takeLatest(
    action =>
      action.type === ActionTypes.loadItems &&
      action.itemType === ItemType,
    loadItemsSaga
  )

with helper:
  takeLatest(isAction.load(ItemType), loadItemsSaga)
*/

const is = (actionType: ActionTypes) => (itemType: string) => (
  action: Action
) => action.type === actionType && action.meta.itemType === itemType

export const isAction: any = {
  Load: is(ActionTypes.loadItems),
  Add: is(ActionTypes.addItems),
  Update: is(ActionTypes.updateItems),
  Delete: is(ActionTypes.deleteItems),
  Import: is(ActionTypes.importItems),
  Export: is(ActionTypes.exportItems),
  Active: is(ActionTypes.setActiveItem),
  Select: is(ActionTypes.setSelectedItem),
}
