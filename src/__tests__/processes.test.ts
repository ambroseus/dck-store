import { combineReducers, Reducer } from 'redux'
import SagaTester from 'redux-saga-tester'
import { all, takeLatest } from 'redux-saga/effects'

import { isAction } from '../helpers/actions'
import { dckActions, dckSelectors, dckReducer } from '../index'
import { Process } from '../helpers/processes'
import { ActionTypes, Acts } from '../types'

const TestItem = 'testItem'

const testItems = [
  {
    id: '1',
    data: 'data1',
  },
  {
    id: '2',
    data: 'data2',
  },
]

const initialState = {
  dck: { items: {}, itemProps: {}, filters: {}, sorting: {}, processes: {} },
}

const reducers: Reducer = combineReducers({ dck: dckReducer })

Process.extendRequest = getSession

function* getSession(request: any) {
  return yield {
    ...request,
    token: 'SESSION_TOKEN',
  }
}

// fetchers

function testFetcher(request: any) {
  const extendedRequest = {
    itemType: TestItem,
    act: Acts.Load,
    currentPage: 3,
    pageSize: 10,
    filters: undefined,
    sorting: undefined,
    token: 'SESSION_TOKEN',
  }
  expect(request).toEqual(extendedRequest)

  if (request.itemType === TestItem && request.act === Acts.Load) {
    return testFetch()
  }
}

async function testFetch() {
  // simulate async fetch
  await new Promise(resolve => setTimeout(resolve, 10))
  return {
    data: testItems,
    totalItems: 5,
    totalPages: 1,
  }
}

function failFetcher(request: any) {
  // simulate failed fetch
  throw new TypeError(`wrong item: ${request.item}`)
}

function* testSaga() {
  yield all([
    takeLatest(isAction.Load(TestItem), loadItemsSaga),
    takeLatest(isAction.Add(TestItem), failAddSaga),
  ])
}

// sagas

function* loadItemsSaga() {
  const proc = new Process.Load(TestItem, {
    fetcher: testFetcher,
    pageble: true,
  })
  yield proc.setCurrentPage(3)
  yield proc.setPageSize(10)
  yield proc.start()

  yield proc.fetch()
  yield proc.setItems(proc.data)
  yield proc.setActiveItem(2)

  yield proc.stop({ message: 'done' })
}

function* failAddSaga(action: any) {
  const proc = new Process.Add(TestItem, {
    fetcher: failFetcher,
  })
  yield proc.start()
  try {
    yield proc.fetch({ item: action.payload.data })
    yield proc.stop()
  } catch (e) {
    yield proc.fail(e)
  }
}

// tests

describe('process helper', () => {
  it('should successfully execute loadItemsSaga', async () => {
    const sagaTester = new SagaTester({
      initialState,
      reducers,
    })
    sagaTester.start(testSaga)
    expect(sagaTester.getState()).toEqual(initialState)

    sagaTester.dispatch(dckActions.loadItems(TestItem))
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
            currentPage: 0,
            pageSize: 10,
            totalItems: 5,
            totalPages: 1,
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

    const state = sagaTester.getState()
    expect(state).toEqual(stateAfter)

    expect(dckSelectors.isProcessRunning(state, TestItem, Acts.Load)).toEqual(
      false
    )
    expect(dckSelectors.isProcessSucceed(state, TestItem, Acts.Load)).toEqual(
      true
    )
    expect(
      dckSelectors.getProcessResponse(state, TestItem, Acts.Load)
    ).toEqual({ message: 'done' })
    expect(dckSelectors.getItems(state, TestItem)).toEqual(testItems)
    expect(dckSelectors.getActiveItem(state, TestItem)).toEqual(testItems[1])
    expect(dckSelectors.getPageSize(state, TestItem)).toEqual(10)
    expect(dckSelectors.getCurrentPage(state, TestItem)).toEqual(0)
    expect(dckSelectors.getTotalItems(state, TestItem)).toEqual(5)
    expect(dckSelectors.getTotalPages(state, TestItem)).toEqual(1)
  })

  it('should successfully execute failAddSaga', async () => {
    const sagaTester = new SagaTester({
      initialState,
      reducers,
    })
    const action = dckActions.addItem(TestItem, {
      field: 'fakeField',
      data: 'fakeData',
    })

    sagaTester.start(testSaga)
    sagaTester.dispatch(action)
    await sagaTester.waitFor(ActionTypes.processFail)

    const state = sagaTester.getState()
    const stateAfter = {
      dck: {
        items: {},
        itemProps: {},
        filters: {},
        sorting: {},
        processes: {
          testItem: {
            Add: {
              running: false,
              error: true,
              response: {
                message: 'wrong item: fakeData',
              },
            },
          },
        },
      },
    }
    expect(state).toEqual(stateAfter)
    expect(dckSelectors.isProcessFailed(state, TestItem, Acts.Add)).toEqual(
      true
    )
  })
})
