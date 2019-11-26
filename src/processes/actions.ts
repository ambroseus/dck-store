import { composeAction } from '../helpers/actions'
import { IAction, ActionTypes, Acts } from '../types'

// action creators for processes

export function processStart(itemType: string, process: Acts): IAction {
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

export function processReset(itemType: string, process: Acts): IAction {
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
  process: Acts,
  response: any
): IAction {
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
  process: Acts,
  response: any
): IAction {
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
