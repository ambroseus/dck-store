import { testHook } from './testHook'
import { useItems } from '../items/hooks'
import { cleanup, waitForElement } from '@testing-library/react'
import { TestItem } from './testData'

afterEach(cleanup)

describe('hooks', () => {
  it('should render component with hook useItems', async () => {
    const { getByTestId, getByText } = testHook(() => useItems(TestItem))
    await waitForElement(() => getByTestId('output'))
    expect(
      getByText('[{"id":"1","data":"data1"},{"id":"2","data":"data2"}]')
    ).toBeDefined()
  })
})
