import { combineReducers, Reducer } from 'redux'
import SagaTester from 'redux-saga-tester'
import { all, takeLatest } from 'redux-saga/effects'

import { isAction } from '../helpers/actions'
import { dckActions, dckSelectors, dckReducer } from '../index'
import { Process } from '../helpers/processes'
import { ActionTypes, Acts } from '../types'

const TestItem = 'testItem'

Process.extendRequest = getSession

function* getSession(request: any) {
  return yield {
    ...request,
    token: 'SESSION_TOKEN',
  }
}

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

// simulate async fetch
async function testFetch() {
  await new Promise(resolve => setTimeout(resolve, 10))
  return {
    data: testItems,
  }
}

const initialState = {
  dck: { items: {}, itemProps: {}, filters: {}, sorting: {}, processes: {} },
}

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
        currentPage: 3,
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

const reducers: Reducer = combineReducers({ dck: dckReducer })

const sagaTester = new SagaTester({
  initialState,
  reducers,
})

function* testSaga() {
  yield all([takeLatest(isAction.Load(TestItem), loadItemsSaga)])
}

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

describe('process helper', () => {
  it('should run loadItemsSaga', async () => {
    sagaTester.start(testSaga)
    expect(sagaTester.getState()).toEqual(initialState)

    sagaTester.dispatch(dckActions.loadItems(TestItem))
    await sagaTester.waitFor(ActionTypes.processStop)

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
  })
})
