import { ActionTypes } from '../actionTypes'
import { Action } from '../types'
import { composeAction, processType } from '../helpers'

// action creators for processes

export function processStart(itemType: string, process: string): Action {
  return composeAction(ActionTypes.processStart)({
    itemType: processType(itemType),
    field: process,
    payload: {
      running: true,
      error: false,
      response: {},
    },
  })
}

export function processReset(itemType: string, process: string): Action {
  return composeAction(ActionTypes.processReset)({
    itemType: processType(itemType),
    field: process,
    payload: {
      running: false,
      error: false,
      response: {},
    },
  })
}

export function processStop(
  itemType: string,
  process: string,
  response: any
): Action {
  return composeAction(ActionTypes.processStop)({
    itemType: processType(itemType),
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
    itemType: processType(itemType),
    field: process,
    payload: {
      running: false,
      error: true,
      response: response || {},
    },
  })
}
