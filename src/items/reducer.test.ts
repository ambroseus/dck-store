import { itemsReducer } from './reducer'
import { setItems, setItemData, updateItem } from './actions'
import { State } from '../types'

describe('items reducer', () => {
  it('should handle initial state', () => {
    const action = { type: '' }
    expect(itemsReducer(undefined, action)).toEqual({})
  })

  it('should immutable update state for action [setItem]', () => {
    const stateBefore: State = {
      item: {},
      testItem: { testField: {} }
    }
    const stateAfter: State = {
      item: {},
      testItem: {
        testField: {},
        items: [{ id: '1', data: 'testData' }],
        itemIndex: { '1': 0 }
      }
    }

    const action = setItems('testItem', [{ id: '1', data: 'testData' }])
    const state: State = itemsReducer(stateBefore, action)

    expect(state).toEqual(stateAfter)
    expect(state).not.toBe(stateBefore)

    expect(state.testItem.items).toEqual([{ id: '1', data: 'testData' }])
    expect(state.testItem.itemIndex).toEqual({ '1': 0 })
    expect(state.item).toBe(stateBefore.item)
    expect(state.testItem).not.toBe(stateBefore.testItem)
    expect(state.testItem.items).not.toBe(stateBefore.testItem.items)
    expect(state.testItem.testField).toBe(stateBefore.testItem.testField)
  })

  it('should immutable update state for action [setItemData]', () => {
    const stateBefore: State = {
      item: {},
      testItem: {
        items: [{ id: '1', data: 'testData' }],
        itemIndex: { '1': 0 }
      }
    }
    const stateAfter: State = {
      item: {},
      testItem: {
        testField: {},
        items: [{ id: '1', data: 'testData' }],
        itemIndex: { '1': 0 }
      }
    }

    const action = setItemData('testItem', 'testField', {})
    const state: State = itemsReducer(stateBefore, action)

    expect(state).toEqual(stateAfter)
    expect(state).not.toBe(stateBefore)

    expect(state.testItem.testField).toEqual({})
    expect(state.item).toBe(stateBefore.item)
    expect(state.testItem).not.toBe(stateBefore.testItem)
    expect(state.testItem.items).toBe(stateBefore.testItem.items)
    expect(state.testItem.testField).not.toBe(stateBefore.testItem.testField)
  })

  it('should immutable update state for action [updateItem]', () => {
    const stateBefore: State = {
      item: {},
      testItem: {
        testField: {},
        items: [
          { id: '2', data: 'testData2' },
          { id: '1', data: 'testData1' }
        ],
        itemIndex: { '2': 0, '1': 1 }
      }
    }
    const stateAfter: State = {
      item: {},
      testItem: {
        testField: {},
        items: [
          { id: '2', data: 'testData2' },
          { id: '1', data: 'updated' }
        ],
        itemIndex: { '2': 0, '1': 1 }
      }
    }

    const action = updateItem('testItem', '1', { id: '1', data: 'updated' })
    const state: State = itemsReducer(stateBefore, action)

    expect(state).toEqual(stateAfter)
    expect(state).not.toBe(stateBefore)

    expect(state.testItem.items).toEqual([
      { id: '2', data: 'testData2' },
      { id: '1', data: 'updated' }
    ])
    expect(state.testItem.itemIndex).toEqual({ '2': 0, '1': 1 })

    expect(state.item).toBe(stateBefore.item)
    expect(state.testItem).not.toBe(stateBefore.testItem)
    expect(state.testItem.items).not.toBe(stateBefore.testItem.items)
    expect(state.testItem.itemIndex).toBe(stateBefore.testItem.itemIndex)
    expect(state.testItem.items[0]).toBe(stateBefore.testItem.items[0])
    expect(state.testItem.testField).toBe(stateBefore.testItem.testField)
  })

  it('should not update state for action [updateItem] if item not found by id', () => {
    let stateBefore: State = {}
    let state: State = itemsReducer(
      stateBefore,
      updateItem('testItem', '1', {})
    )
    expect(state).toEqual(stateBefore)
    expect(state).toBe(stateBefore)

    stateBefore = {
      testItem: {
        items: [
          { id: '1', data: 'testData1' },
          { id: '2', data: 'testData2' }
        ]
      }
    }
    state = itemsReducer(stateBefore, updateItem('testItem', '', undefined))
    expect(state).toEqual(stateBefore)
    expect(state).toBe(stateBefore)

    state = itemsReducer(stateBefore, updateItem('testItem', '0', {}))
    expect(state).toEqual(stateBefore)
    expect(state).toBe(stateBefore)
  })
})
