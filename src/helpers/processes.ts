import { call, put, select } from 'redux-saga/effects'

import {
  getFilters,
  getSortFields,
  getCurrentPage,
  getPageSize,
  getItemProp,
} from '../dck/selectors'

import { Acts } from '../types'
import {
  processStart,
  processReset,
  processStop,
  processFail,
  setActiveItem,
  setItem,
  setItems,
} from '../dck/actions'

import { TDataProvider } from '../types'

export type TProcess = typeof Process
export type TProcessLoad = typeof ProcessLoad
export type TProcessAdd = typeof ProcessAdd
export type TProcessUpdate = typeof ProcessUpdate
export type TProcessDelete = typeof ProcessDelete
export type TProcessImport = typeof ProcessImport
export type TProcessExport = typeof ProcessExport

export type TProcessInstance =
  | InstanceType<TProcess>
  | InstanceType<TProcessLoad>
  | InstanceType<TProcessAdd>
  | InstanceType<TProcessUpdate>
  | InstanceType<TProcessDelete>
  | InstanceType<TProcessImport>
  | InstanceType<TProcessExport>

export class Process {
  public static Load: TProcessLoad
  public static Add: TProcessAdd
  public static Update: TProcessUpdate
  public static Delete: TProcessDelete
  public static Import: TProcessImport
  public static Export: TProcessExport

  public act: Acts
  public itemType: string
  public provider: TDataProvider | any
  public options: any
  public response: any
  public data: any

  constructor(
    act: Acts,
    itemType?: string,
    provider?: TDataProvider | any,
    options?: any
  ) {
    this.act = act
    this.itemType = itemType || ''
    this.provider = provider
    this.options = options || {}
    this.response = null
    this.data = null
  }

  filters = () => select(state => getFilters(state, this.itemType))

  sorting = () => select(state => getSortFields(state, this.itemType))

  page = () => select(state => getCurrentPage(state, this.itemType))

  pageSize = () => select(state => getPageSize(state, this.itemType))

  itemProp = (prop: any) =>
    select(state => getItemProp(state, this.itemType, prop))

  start = () => put(processStart(this.itemType, this.act))

  reset = () => put(processReset(this.itemType, this.act))

  stop = (response?: any) => put(processStop(this.itemType, this.act, response))

  fail = (response: any) => put(processFail(this.itemType, this.act, response))

  setActive = (id: string) => put(setActiveItem(this.itemType, String(id)))

  set = (data: any, id?: string | number) => {
    if (!data) return
    if (id !== void 0) {
      return put(setItem(this.itemType, String(id), data))
    } else {
      if (!Array.isArray(data)) data = [data]
      return put(setItems(this.itemType, data))
    }
  };

  *provideData(request: any): any {
    if (this.provider?.provideData) {
      request = yield this.extendRequest(request)
      const response = yield call(
        [this.provider, this.provider.provideData],
        request
      )
      this.response = yield this.postprocessResponse(response)
    }
  }

  *extendRequest(request: any): any {
    request = request || {}
    if (this.options.pageble) {
      const page = yield this.page()
      const pageSize = yield this.pageSize()
      const filters = yield this.filters()
      const sorting = yield this.sorting()
      request.pageble = {
        page,
        pageSize,
        filters,
        sorting,
      }
    }
    return request
  }

  *postprocessResponse(response: any): any {
    response = response || {}
    return yield response
  }
}

class ProcessLoad extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Load, itemType, provider, options)
  }
}

class ProcessAdd extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Add, itemType, provider, options)
  }
}

class ProcessUpdate extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Update, itemType, provider, options)
  }
}

class ProcessDelete extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Delete, itemType, provider, options)
  }
}

class ProcessImport extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Import, itemType, provider, options)
  }
}

class ProcessExport extends Process {
  constructor(itemType: string, provider?: any, options?: any) {
    super(Acts.Export, itemType, provider, options)
  }
}

Process.Load = ProcessLoad
Process.Add = ProcessAdd
Process.Update = ProcessUpdate
Process.Delete = ProcessDelete
Process.Import = ProcessImport
Process.Export = ProcessExport
