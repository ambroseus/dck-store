import { TProcessInstance } from '../types'

export type TDataProvider = DataProvider

export class DataProvider {
  doRequest(request) {
    return request
  }
  provideData(process: TProcessInstance, request: any): void {
    const response = this.doRequest(process.normalizeRequest(request))
    process.normalizeResponse(response)
  }
}
