import { combineReducers, Reducer } from 'redux'
import SagaTester from 'redux-saga-tester'
import { all, takeLatest } from 'redux-saga/effects'

import { dckReducer } from '../dck/reducer'
import { isAction } from '../helpers/actions'
import { loadItems } from '../dck/actions'
import { Process } from '../helpers/processes'
import { ActionTypes, Acts } from '../types'

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

function loadTestItemsFetcher(request: any) {
  if (request.itemType === 'testItem' && request.act === Acts.Load) {
    return testFetch()
  }
}

// similate async fetch
async function testFetch() {
  await new Promise(resolve => setTimeout(resolve, 10))
  return {
    data: [
      {
        id: '1',
        data: 'data1',
      },
      {
        id: '2',
        data: 'data2',
      },
    ],
  }
}

function* loadTestItemsSaga(action: any) {
  const proc = new Process.Load('testItem', loadTestItemsFetcher, {
    pageble: true,
  })
  yield proc.setItemProp('page', 3)
  yield proc.setItemProp('pageSize', 10)
  yield proc.start()
  yield proc.fetch()
  yield proc.set(proc.response.data)
  yield proc.setActive(2)
  yield proc.stop({ message: 'done' })
}

describe('process helper', () => {
  it('should run loadTestItemsSaga', async () => {
    sagaTester.start(testSaga)
    expect(sagaTester.getState()).toEqual(initialState)
    sagaTester.dispatch(loadItems('testItem'))
    await sagaTester.waitFor(ActionTypes.processStop)

    const stateAfter = {
      dck: {
        items: {
          testItem: {
            items: [
              {
                id: '1',
                data: 'data1',
              },
              {
                id: '2',
                data: 'data2',
              },
            ],
            itemIndex: {
              '1': 0,
              '2': 1,
            },
            selectedItems: {},
            activeItemId: '2',
          },
        },
        itemProps: {
          testItem: {
            page: 3,
            pageSize: 10,
          },
        },
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
