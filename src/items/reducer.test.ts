import { itemsReducer } from './reducer'
import { setItems, setItemData } from './actions'
import { State } from '../types'

describe('items reducer', () => {
  it('should handle initial state', () => {
    const action = { type: '' }
    expect(itemsReducer(undefined, action)).toEqual({})
  })

  it('should immutable update state for action setItem', () => {
    const itemType = 'testItem'
    const testData = ['testData']
    const testField = 'itemData'
    const action = setItems(itemType, testData)
    const stateBefore: State = {
      item: {},
      [itemType]: { [testField]: {} }
    }
    const stateAfter: State = {
      item: {},
      [itemType]: { [testField]: {}, items: ['testData'] }
    }
    const state: State = itemsReducer(stateBefore, action)

    expect(state).toEqual(stateAfter)
    expect(state[itemType].items).toEqual(testData)
    expect(state === stateBefore).toEqual(false)
    expect(state.item === stateBefore.item).toEqual(true)
    expect(state[itemType] === stateBefore[itemType]).toEqual(false)
    expect(state[itemType].items === stateBefore[itemType].items).toEqual(false)
    expect(
      state[itemType][testField] === stateBefore[itemType][testField]
    ).toEqual(true)
  })

  it('should immutable update state for action setItemData', () => {
    const itemType = 'testItem'
    const testData = ['testData']
    const testField = 'itemData'
    const action = setItemData(itemType, testField, testData)
    const stateBefore: State = {
      item: {},
      [itemType]: { items: testData }
    }
    const stateAfter: State = {
      item: {},
      [itemType]: { [testField]: testData, items: testData }
    }
    const state: State = itemsReducer(stateBefore, action)

    expect(state).toEqual(stateAfter)
    expect(state[itemType][testField]).toEqual(testData)
    expect(state === stateBefore).toEqual(false)
    expect(state.item === stateBefore.item).toEqual(true)
    expect(state[itemType] === stateBefore[itemType]).toEqual(false)
    expect(state[itemType].items === stateBefore[itemType].items).toEqual(true)
    expect(
      state[itemType][testField] === stateBefore[itemType][testField]
    ).toEqual(false)
  })
})
