import { testSelectorHook, testDispatcherHook } from './testHooks'
import * as itemsHooks from '../items/hooks'
import { cleanup, waitForElement, fireEvent } from '@testing-library/react'
import { TestItem } from './testData'

afterEach(cleanup)

describe('items selectors hooks', () => {
  describe('selector useItems', () => {
    it('should successfully execute', () => {
      const { getByText } = testSelectorHook(() =>
        itemsHooks.useItems(TestItem)
      )
      expect(
        getByText('[{"id":"1","data":"data1"},{"id":"2","data":"data2"}]')
      ).toBeDefined()
    })
  })

  describe('selector useItem', () => {
    it('should successfully execute', () => {
      const { getByText } = testSelectorHook(() =>
        itemsHooks.useItem(TestItem, 1)
      )
      expect(getByText('{"id":"1","data":"data1"}')).toBeDefined()
    })
  })

  describe('selector useOptedItemId', () => {
    it('should successfully execute', () => {
      const { getByText } = testSelectorHook(() =>
        itemsHooks.useOptedItemId(TestItem)
      )
      expect(getByText('2')).toBeDefined()
    })
  })

  describe('selector useOptedItem', () => {
    it('should successfully execute', () => {
      const { getByText } = testSelectorHook(() =>
        itemsHooks.useOptedItem(TestItem)
      )
      expect(getByText('{"id":"2","data":"data2"}')).toBeDefined()
    })
  })
})

describe('items dispatchers hooks', () => {
  describe('dispatcher useSetItems', () => {
    it('should successfully execute', async () => {
      const { getByTestId } = testDispatcherHook(() =>
        itemsHooks.useSetItems(TestItem, [])
      )
      fireEvent.click(getByTestId('testid'))
      const el = await waitForElement(() => getByTestId('clicked'))
      expect(el).toBeDefined()
    })
  })
})
