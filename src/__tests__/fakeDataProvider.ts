import { DataProvider } from '../providers'

export class FakeDataProvider extends DataProvider {
  provideData(request: any) {
    return { ...request, result: true }
  }
}
