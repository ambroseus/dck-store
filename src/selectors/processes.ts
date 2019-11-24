import { createSelector } from '@reduxjs/toolkit'
import { getDckState, get3rdParam } from '../helpers'
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

type getProcess = (state: State, itemType: string, process: string) => any
type getProcessState = (state: State, itemType: string) => any

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
  process => Boolean(process.running)
)

export const isProcessIdle: getProcessStatus = createSelector(
  isProcessRunning,
  running => !running
)

export const isProcessSucceed: getProcessStatus = createSelector(
  [getProcess, isProcessIdle],
  (process, idle) => idle && !process.error
)

export const isProcessFailed: getProcessStatus = createSelector(
  [getProcessState, isProcessIdle],
  (process, idle) => idle && Boolean(process.error)
)

const emptyObject = {}
export const getProcessResponse: getProcessResponse = createSelector(
  getProcessState,
  process => process.response || emptyObject
)
