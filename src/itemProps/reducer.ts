import { createReducer } from '@reduxjs/toolkit'
import { ActionTypes } from 'actionTypes'
import { reducers } from 'reducers'

const { setItemProp } = reducers

export const itemPropsReducer = createReducer(
  {},
  {
    [ActionTypes.setItemProp]: setItemProp,
  }
)
