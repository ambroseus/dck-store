import { all, takeLatest } from 'redux-saga/effects'
import { Process } from '../helpers/processes'
import { isAction } from '../helpers/actions'
import { testLoadFetcher, failFetcher } from './fetchers'
import { TestItem } from './testData'

Process.extendRequest = getSession

function* getSession(request: any) {
  return yield {
    ...request,
    token: 'SESSION_TOKEN',
  }
}

export function* testSaga() {
  yield all([
    takeLatest(isAction.Load(TestItem), loadItemsSaga),
    takeLatest(isAction.Add(TestItem), failAddSaga),
  ])
}

function* loadItemsSaga() {
  const proc = new Process.Load(TestItem, {
    fetcher: testLoadFetcher,
    pageble: true,
  })
  yield proc.setCurrentPage(3)
  yield proc.setPageSize(10)
  yield proc.start()

  yield proc.fetch()
  yield proc.setItems(proc.data)
  yield proc.setActiveItem(2)

  yield proc.stop({ message: 'done' })
}

function* failAddSaga(action: any) {
  const proc = new Process.Add(TestItem, {
    fetcher: failFetcher,
  })
  yield proc.start()
  try {
    yield proc.fetch(action.payload.data)
    yield proc.stop()
  } catch (e) {
    yield proc.fail(e)
  }
}
