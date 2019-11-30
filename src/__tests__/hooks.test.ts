import { testSelectorHook, testDispatcherHook } from './testHook'
import { useItems, useSetItems } from '../items/hooks'
import { cleanup, waitForElement, fireEvent } from '@testing-library/react'
import { TestItem } from './testData'

afterEach(cleanup)

describe('hooks', () => {
  describe('selector useItems', () => {
    it('should successfully execute', async () => {
      const { getByTestId, getByText } = testSelectorHook(() =>
        useItems(TestItem)
      )
      await waitForElement(() => getByTestId('testid'))
      expect(
        getByText('[{"id":"1","data":"data1"},{"id":"2","data":"data2"}]')
      ).toBeDefined()
    })
  })

  describe('dispatcher useSetItems', () => {
    it('should successfully execute', async () => {
      const { getByTestId } = testDispatcherHook(() =>
        useSetItems(TestItem, [])
      )
      let el = await waitForElement(() => getByTestId('testid'))
      fireEvent.click(el)
      el = await waitForElement(() => getByTestId('clicked'))
      expect(el).toBeDefined()
    })
  })
})
