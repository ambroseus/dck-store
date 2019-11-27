import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from '../helpers/selectors'
import { IState } from '../types'

type getProcessStatus = (
  state: IState,
  itemType: string,
  process: string
) => boolean

type getProcessResponse = (
  state: IState,
  itemType: string,
  process: string
) => any

type getProcess = (state: IState, itemType: string, process: string) => any
type getProcessState = (state: IState, itemType: string) => any

const _getProcessState = getDckState('processes')

const getProcessState: getProcessState = createSelector(
  _getProcessState,
  processState => processState
)

const getProcess: getProcess = createSelector(
  [getProcessState, get3rdParam],
  (processState, process) => processState[process]
)

export const isProcessRunning: getProcessStatus = createSelector(
  getProcess,
  process => Boolean(process?.running)
)

export const isProcessIdle: getProcessStatus = createSelector(
  isProcessRunning,
  running => !running
)

export const isProcessFinished: getProcessStatus = createSelector(
  [getProcess, isProcessIdle],
  (process, idle) => idle && Boolean(process?.response)
)

export const isProcessSucceed: getProcessStatus = createSelector(
  [getProcess, isProcessFinished],
  (process, finished) => finished && !process?.error
)

export const isProcessFailed: getProcessStatus = createSelector(
  isProcessSucceed,
  success => !success
)

export const getProcessResponse: getProcessResponse = createSelector(
  getProcess,
  process => process.response
)
