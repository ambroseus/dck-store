import { combineReducers, Reducer } from 'redux'
import SagaTester from 'redux-saga-tester'
import { all, takeLatest } from 'redux-saga/effects'

import { dckReducer } from '../dck/reducer'
import { isAction } from '../helpers/actions'
import { loadItems } from '../dck/actions'
import { Process } from '../helpers/processes'
import { FakeDataProvider } from './fakeDataProvider'
import { ActionTypes } from '../types'

const initialState = {
  dck: { items: {}, itemProps: {}, filters: {}, sorting: {}, processes: {} },
}

const reducers: Reducer = combineReducers({ dck: dckReducer })
const sagaTester = new SagaTester({
  initialState,
  reducers,
})

function* testSaga() {
  yield all([takeLatest(isAction.Load('testItem'), loadTestItemsSaga)])
}

const provider = new FakeDataProvider()

function* loadTestItemsSaga(action: any) {
  const proc = new Process.Load('testItem', provider, { pageble: true })
  yield proc.start()
  yield proc.provideData({ test: 'test' })
  yield proc.stop({ message: 'done' })

  const response = {
    test: 'test',
    pageble: {
      page: undefined,
      pageSize: undefined,
      filters: undefined,
      sorting: undefined,
    },
    result: true,
  }
  expect(proc.response).toEqual(response)
}

describe('process helper', () => {
  it('should run loadTestItemsSaga', async () => {
    sagaTester.start(testSaga)
    expect(sagaTester.getState()).toEqual(initialState)
    sagaTester.dispatch(loadItems('testItem'))
    await sagaTester.waitFor(ActionTypes.processStop)

    const stateAfter = {
      dck: {
        items: {},
        itemProps: {},
        filters: {},
        sorting: {},
        processes: {
          testItem: {
            Load: {
              running: false,
              error: false,
              response: {
                message: 'done',
              },
            },
          },
        },
      },
    }

    expect(sagaTester.getState()).toEqual(stateAfter)
  })
})
