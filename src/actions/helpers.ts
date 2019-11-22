import { createAction } from '@reduxjs/toolkit'

export const composeAction = (actionType: string): any => {
  return createAction(actionType, params => {
    const { itemType, field, ...payload } = params
    return { meta: { itemType, field }, payload }
  })
}
