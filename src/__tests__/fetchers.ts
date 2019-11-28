import { Acts } from '../types'
import { TestItem, testItems, testRequest } from './testData'

export function testLoadFetcher(request: any) {
  expect(request).toEqual(testRequest)
  if (request.itemType === TestItem && request.act === Acts.Load) {
    return testFetch()
  }
}
export function failFetcher(request: any) {
  // simulate failed fetch
  throw new TypeError(`wrong item: ${request.params}`)
}

async function testFetch() {
  // simulate async fetch
  await new Promise(resolve => setTimeout(resolve, 10))
  return {
    data: testItems,
    totalItems: 5,
    totalPages: 1,
  }
}
