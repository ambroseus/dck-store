import { TProcessInstance } from '../types'
export type TDataProvider = DataProvider

export class DataProvider {
  public response: any
  public data: any

  async request(process: TProcessInstance, request: any) {
    const response = await request
    process.normalizeResponse(response)
  }
}
