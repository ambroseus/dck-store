import { State } from '../types'
import {
  getItems,
  getItem,
  getItemProp,
  getActiveItemId,
  getActiveItem
} from './items'

const state: State = {
  dck: {
    testItem: {
      testField: 'testData',
      items: [
        { field: 'active', data: 'testData' },
        { id: '1', data: 'testData1' }
      ],
      itemIndex: { active: 0, '1': 1 },
      selectedItems: { '1': 1 },
      activeItemId: 'active'
    }
  }
}

describe('items selectors', () => {
  describe('selector [getItems]', () => {
    it('should return data for given itemType', () => {
      const result = getItems(state, 'testItem')
      expect(result).toEqual([
        { field: 'active', data: 'testData' },
        { id: '1', data: 'testData1' }
      ])
    })
    it('should return undefined for unknown itemType', () => {
      const result = getItems(state, 'fakeItem')
      expect(result).toBeUndefined()
    })
  })

  describe('selector [getItem]', () => {
    it('should return data for given itemType & id', () => {
      const result = getItem(state, 'testItem', '1')
      expect(result).toEqual({ id: '1', data: 'testData1' })
    })
    it('should return undefined for unknown itemType', () => {
      const result = getItem(state, 'fakeItem', '1')
      expect(result).toBeUndefined()
    })
    it('should return undefined for unknown item id', () => {
      const result = getItem(state, 'testItem', '0')
      expect(result).toBeUndefined()
    })
  })

  describe('selector [getItemProp]', () => {
    it('should return data for given itemType & field', () => {
      const result = getItemProp(state, 'testItem', 'testField')
      expect(result).toEqual('testData')
    })
    it('should return undefined for unknown itemType', () => {
      const result = getItemProp(state, 'fakeItem', 'testField')
      expect(result).toBeUndefined()
    })
    it('should return undefined for unknown field', () => {
      const result = getItemProp(state, 'testItem', 'fakeField')
      expect(result).toBeUndefined()
    })
  })

  describe('selectors [getActiveItem, getActiveItemId]', () => {
    it('should return active item/id for given itemType', () => {
      const id = getActiveItemId(state, 'testItem')
      expect(id).toEqual('active')
      const result = getActiveItem(state, 'testItem')
      expect(result).toEqual({ field: 'active', data: 'testData' })
    })
    it('should return undefined for unknown itemType', () => {
      const id = getActiveItemId(state, 'fakeItem')
      expect(id).toBeUndefined()
      const result = getActiveItem(state, 'fakeItem')
      expect(result).toBeUndefined()
    })
  })
})
