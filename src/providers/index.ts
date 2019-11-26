import { TProcessInstance } from '../types'
import { resolve } from 'dns'
export type TDataProvider = DataProvider

export class DataProvider {
  request(process: TProcessInstance, request: any): void {
    process.normalizeResponse(request)
  }
}
