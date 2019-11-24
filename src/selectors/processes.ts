import { getItemState, processType } from '../helpers'
import { State } from '../types'

export function isProcessRunning(
  state: State,
  itemType: string,
  process: string
): boolean {
  return Boolean(getItemState(state, processType(itemType))?.[process]?.running)
}

export function isProcessIdle(
  state: State,
  itemType: string,
  process: string
): boolean {
  return !isProcessRunning(state, itemType, process)
}

export function isProcessSucceed(
  state: State,
  itemType: string,
  process: string
): boolean {
  const processState =
    getItemState(state, processType(itemType))?.[process] || {}
  return !processState.running && !processState.error
}

export function isProcessFailed(
  state: State,
  itemType: string,
  process: string
): boolean {
  return !isProcessSucceed(state, itemType, process)
}

const emptyObject = {}

export function getProcessResult(
  state: State,
  itemType: string,
  process: string
): object {
  return (
    getItemState(state, processType(itemType))?.[process]?.result || emptyObject
  )
}
