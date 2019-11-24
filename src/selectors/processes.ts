import { createSelector } from '@reduxjs/toolkit'
import { getItemState, processType } from '../helpers'
import { State } from '../types'

type getProcessStatus = (
  state: State,
  itemType: string,
  process: string
) => boolean

type getProcessResponse = (
  state: State,
  itemType: string,
  process: string
) => any

const emptyObject = {}

function getProcessState(
  state: State,
  itemType: string,
  process: string
): State {
  return getItemState(state, processType(itemType))?.[process] || emptyObject
}

export const isProcessRunning: getProcessStatus = createSelector(
  getProcessState,
  process => Boolean(process.running)
)

export const isProcessIdle: getProcessStatus = createSelector(
  isProcessRunning,
  running => !running
)

export const isProcessSucceed: getProcessStatus = createSelector(
  [getProcessState, isProcessIdle],
  (process, idle) => idle && !process.error
)

export const isProcessFailed: getProcessStatus = createSelector(
  [getProcessState, isProcessIdle],
  (process, idle) => idle && Boolean(process.error)
)

export const getProcessResponse: getProcessResponse = createSelector(
  getProcessState,
  process => process.response || emptyObject
)
