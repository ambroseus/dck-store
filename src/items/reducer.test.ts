import { State } from '../types'
import { setItems, setItem, setActiveItem } from '../actions/items'
import { setSelectedItem } from '../actions/selection'
import { itemsReducer } from './reducer'

describe('itemsReducer', () => {
  it('should handle initial state', () => {
    const action = { type: '' }
    expect(itemsReducer(void 0, action)).toEqual({})
  })

  describe('for action [setItems]', () => {
    it('should immutable update state', () => {
      const stateBefore: State = {
        item: {},
        testItem: { items: [] },
      }
      const stateAfter: State = {
        item: {},
        testItem: {
          items: [
            { id: '1', data: 'testData' },
            { field: 'testField', data: 'testFieldData' },
          ],
          itemIndex: { '1': 0, testField: 1 },
          selectedItems: {},
        },
      }

      const state: State = itemsReducer(
        stateBefore,
        setItems('testItem', [
          { id: '1', data: 'testData' },
          { field: 'testField', data: 'testFieldData' },
        ])
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).not.toBe(stateBefore.testItem.items)
    })
  })

  /*
  describe('for action [setItemProp]', () => {
    it('should immutable update state', () => {
      const stateBefore: State = {
        item: {},
        testItem: {
          items: [{ id: '1', data: 'testData' }],
          itemIndex: { '1': 0 },
        },
      }
      const stateAfter: State = {
        item: {},
        testItem: {
          testField: {},
          items: [{ id: '1', data: 'testData' }],
          itemIndex: { '1': 0 },
        },
      }

      const state: State = itemsReducer(
        stateBefore,
        setItemProp('testItem', 'testField', {})
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
*/
  describe('for action [setActiveItem]', () => {
    it('should immutable update state', () => {
      const stateBefore: State = {
        item: {},
        testItem: {
          items: [{ id: '1', data: 'testData' }],
        },
      }
      const stateAfter: State = {
        item: {},
        testItem: {
          activeItemId: '1',
          items: [{ id: '1', data: 'testData' }],
        },
      }

      let state: State = itemsReducer(
        stateBefore,
        setActiveItem('testItem', '1')
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).toBe(stateBefore.testItem.items)

      state = itemsReducer(stateBefore, setActiveItem('testItem'))
      expect(state.testItem.activeItemId).toEqual(void 0)
    })
  })

  describe('for action [setItem]', () => {
    it('should immutable update state', () => {
      const stateBefore: State = {
        item: {},
        testItem: {
          items: [
            { id: 0, data: {} },
            { id: '1', data: 'testData' },
            { field: 'testField', data: 'testFieldData' },
          ],
          itemIndex: { '0': 0, '1': 1, testField: 2 },
        },
      }
      const stateAfter: State = {
        item: {},
        testItem: {
          items: [
            { id: 0, data: {} },
            { id: '1', data: 'updated1' },
            { field: 'testField', data: 'updated2' },
          ],
          itemIndex: { '0': 0, '1': 1, testField: 2 },
        },
      }

      let state: State = itemsReducer(
        stateBefore,
        setItem('testItem', '1', { id: '1', data: 'updated1' })
      )
      state = itemsReducer(
        state,
        setItem('testItem', 'testField', {
          field: 'testField',
          data: 'updated2',
        })
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).not.toBe(stateBefore.testItem.items)
      expect(state.testItem.itemIndex).toBe(stateBefore.testItem.itemIndex)
      expect(state.testItem.items[0]).toBe(stateBefore.testItem.items[0])
    })

    it('should append item if item not found', () => {
      let stateBefore: State = {}
      let stateAfter: State = {
        testItem: {
          items: [{ id: '1', data: 'testData' }],
          itemIndex: { '1': 0 },
        },
      }
      let state: State = itemsReducer(
        stateBefore,
        setItem('testItem', '1', { id: '1', data: 'testData' })
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)

      stateBefore = stateAfter
      stateAfter = {
        testItem: {
          items: [
            { id: '1', data: 'testData' },
            { field: 'testField', data: 'testFieldData' },
          ],
          itemIndex: { '1': 0, testField: 1 },
        },
      }
      state = itemsReducer(
        stateBefore,
        setItem('testItem', 'testField', {
          field: 'testField',
          data: 'testFieldData',
        })
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)
    })
  })

  describe('for action [setSelectedItem]', () => {
    it('should select item', () => {
      const stateBefore: State = {
        testItem: {
          items: [
            { id: 0, data: {} },
            { id: '1', data: 'testData' },
            { field: 'testField', data: 'testFieldData' },
          ],
          itemIndex: { '0': 0, '1': 1, testField: 2 },
          selectedItems: {},
        },
      }
      const stateAfter: State = {
        testItem: {
          items: [
            { id: 0, data: {} },
            { id: '1', data: 'testData' },
            { field: 'testField', data: 'testFieldData' },
          ],
          itemIndex: { '0': 0, '1': 1, testField: 2 },
          selectedItems: { '1': 1, testField: 2 },
        },
      }

      let state: State = itemsReducer(
        stateBefore,
        setSelectedItem('testItem', '1', true)
      )
      state = itemsReducer(
        state,
        setSelectedItem('testItem', 'testField', true)
      )
      expect(state).toEqual(stateAfter)
      expect(state).not.toBe(stateBefore)

      state = itemsReducer(state, setSelectedItem('testItem', '1', false))
      state = itemsReducer(
        state,
        setSelectedItem('testItem', 'testField', false)
      )
      expect(state).toEqual(stateBefore)
      expect(state).not.toBe(stateBefore)
      expect(state.testItem.selectedItems).toEqual({})
      expect(state.item).toBe(stateBefore.item)
      expect(state.testItem).not.toBe(stateBefore.testItem)
      expect(state.testItem.items).toBe(stateBefore.testItem.items)
      expect(state.testItem.itemIndex).toBe(stateBefore.testItem.itemIndex)
    })
  })
})
