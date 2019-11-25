import { ActionTypes } from '../actionTypes'
import { composeAction } from '../helpers/actions'
import { Action } from '../types'

// action creators for processes

export function processStart(itemType: string, process: string): Action {
  return composeAction(ActionTypes.processStart)({
    itemType,
    field: process,
    payload: {
      running: true,
      error: false,
      response: void 0,
    },
  })
}

export function processReset(itemType: string, process: string): Action {
  return composeAction(ActionTypes.processReset)({
    itemType,
    field: process,
    payload: {
      running: false,
      error: false,
      response: void 0,
    },
  })
}

export function processStop(
  itemType: string,
  process: string,
  response: any
): Action {
  return composeAction(ActionTypes.processStop)({
    itemType,
    field: process,
    payload: {
      running: false,
      error: false,
      response: response || {},
    },
  })
}

export function processFail(
  itemType: string,
  process: string,
  response: any
): Action {
  return composeAction(ActionTypes.processFail)({
    itemType,
    field: process,
    payload: {
      running: false,
      error: true,
      response: response || {},
    },
  })
}
