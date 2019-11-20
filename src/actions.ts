import { createAction } from '@reduxjs/toolkit'
import { ActionTypes } from './actionTypes'

export const SetItems = createAction(
  ActionTypes.SetItems,
  ({ itemType, data }) => ({
    meta: { itemType },
    payload: {
      data
    }
  })
)

export const UpdateItem = createAction(
  ActionTypes.UpdateItem,
  ({ itemType, id, data }) => ({
    meta: { itemType },
    payload: {
      id,
      data
    }
  })
)
