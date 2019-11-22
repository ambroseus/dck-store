import { State } from '../types'
import {
  setItems,
  setItemData,
  updateItem,
  setActiveItem
} from '../actions/items'
import { dckReducer } from './index'

describe('items reducer', () => {
  it('should handle initial state', () => {
    const action = { type: '' }
    expect(dckReducer(void 0, action)).toEqual({})
  })

  describe('for action [setItems]', () => {
    it('should immutable update state', () => {
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

      const state: State = dckReducer(
        stateBefore,
        setItems('testItem', [{ id: '1', data: 'testData' }])
      )

      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)

      expect(state.testItem.items).toEqual([{ id: '1', data: 'testData' }])
      expect(state.testItem.itemIndex).toEqual({ '1': 0 })
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).not.toBe(stateBefore.testItem.items)
      expect(state.testItem.testField).toBe(stateBefore.testItem.testField)
    })
  })

  describe('for action [setItemData]', () => {
    it('should immutable update state', () => {
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

      const state: State = dckReducer(
        stateBefore,
        setItemData('testItem', 'testField', {})
      )

      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)

      expect(state.testItem.testField).toEqual({})
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).toBe(stateBefore.testItem.items)
      expect(state.testItem.testField).not.toBe(stateBefore.testItem.testField)
    })
  })

  describe('for action [setActiveItem]', () => {
    it('should immutable update state', () => {
      const stateBefore: State = {
        item: {},
        testItem: {
          items: [{ id: '1', data: 'testData' }]
        }
      }
      const stateAfter: State = {
        item: {},
        testItem: {
          activeItemId: '1',
          items: [{ id: '1', data: 'testData' }]
        }
      }

      let state: State = dckReducer(stateBefore, setActiveItem('testItem', '1'))

      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)

      expect(state.testItem.activeItemId).toEqual('1')
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).toBe(stateBefore.testItem.items)

      state = dckReducer(stateBefore, setActiveItem('testItem'))
      expect(state.testItem.activeItemId).toEqual(void 0)
    })
  })

  describe('for action [updateItem]', () => {
    it('should immutable update state', () => {
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

      const state: State = dckReducer(
        stateBefore,
        updateItem('testItem', '1', { id: '1', data: 'updated' })
      )

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

    it('should not update state if item not found', () => {
      let stateBefore: State = {}
      let state: State = dckReducer(
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
      state = dckReducer(stateBefore, updateItem('testItem', '', void 0))
      expect(state).toEqual(stateBefore)
      expect(state).toBe(stateBefore)

      state = dckReducer(stateBefore, updateItem('testItem', '0', {}))
      expect(state).toEqual(stateBefore)
      expect(state).toBe(stateBefore)
    })
  })
})
