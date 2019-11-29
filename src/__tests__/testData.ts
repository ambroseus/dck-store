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

export const initialState = {
  dck: { items: {}, itemProps: {}, filters: {}, sorting: {}, processes: {} },
}

export const stateAfterBatchSagas = {
  dck: {
    items: { testItem: { items: [], itemIndex: {}, selectedItems: {} } },
    itemProps: { testItem: { status: '123' } },
    filters: {},
    sorting: {},
    processes: {
      testItem: {
        Import: { running: true, error: false },
        Export: { running: false, error: false },
        Update: { running: true, error: false },
      },
    },
  },
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
        optedItemId: 2,
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
    items: {
      testItem: {
        items: [
          {
            id: 3,
            data: 'testData3',
          },
        ],
        itemIndex: {
          '3': 0,
        },
      },
    },
    itemProps: {},
    filters: {},
    sorting: {},
    processes: {
      testItem: {
        Add: {
          running: false,
          error: false,
          response: {},
        },
      },
    },
  },
}

export const stateAfterDeleteSaga = {
  dck: {
    items: {
      testItem: {
        items: [
          {
            id: '2',
            data: 'data2',
          },
        ],
        itemIndex: {
          '2': 1,
        },
        selectedItems: {},
      },
    },
    itemProps: {},
    filters: {},
    sorting: {},
    processes: {
      testItem: {
        Delete: {
          running: false,
          error: false,
          response: {},
        },
      },
    },
  },
}

export const stateAfterSelectSaga = {
  dck: {
    items: {
      testItem: {
        selectedItems: {},
      },
    },
    itemProps: {},
    filters: {},
    sorting: {},
    processes: {
      __internal__: {
        __select__: {
          running: false,
          error: true,
          response: {
            message: 'wrong item id: 1',
          },
        },
      },
    },
  },
}
