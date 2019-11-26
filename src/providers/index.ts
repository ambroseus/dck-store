export type TDataProvider = DataProvider

export class DataProvider {
  provideData(request: any): any {
    return request
  }
}
