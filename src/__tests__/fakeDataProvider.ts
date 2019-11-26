import { DataProvider } from '../providers'
import { TProcessInstance } from '../types'

export class FakeDataProvider extends DataProvider {
  doRequest(request: any) {
    console.log(request)
    return { result: true }
  }
}
