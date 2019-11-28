import { Acts } from '../types'

export const TestItem = 'testItem'

export const testItems = [
  {
    id: '1',
    data: 'data1',
  },
  {
    id: '2',
    data: 'data2',
  },
]

export const testRequest = {
  itemType: TestItem,
  act: Acts.Load,
  params: undefined,
  pageble: {
    currentPage: 3,
    pageSize: 10,
    filters: undefined,
    sorting: undefined,
  },
  token: 'SESSION_TOKEN',
}

export const initialState = {
  dck: { items: {}, itemProps: {}, filters: {}, sorting: {}, processes: {} },
}

export const stateAfterLoadSaga = {
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

export const stateAfterAddSaga = {
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
