import { createAction } from '@reduxjs/toolkit'

interface IActionParams {
  readonly itemType: string
  [propName: string]: any
}

const withScope = (scope: string, actionType: string): string =>
  `${scope}:${actionType}`

export const composeAction = (
  actionType: string,
  { itemType, ...payload }: IActionParams
): any =>
  createAction(withScope('dck', actionType), () => ({
    meta: { itemType },
    payload
  }))
