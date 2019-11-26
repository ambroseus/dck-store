import { call, put, select } from 'redux-saga/effects'

import {
  getFilters,
  getSortFields,
  getCurrentPage,
  getPageSize,
  getItemProp,
} from '../dck/selectors'

import { Acts, TAct } from '../types'
import {
  processStart,
  processReset,
  processStop,
  processFail,
  setActiveItem,
  setItem,
  setItems,
  setItemProp,
} from '../dck/actions'

import { TFetcher } from '../types'

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

function* extendRequestStub(request: any): any {
  return request
}

export class Process {
  public static Load: TProcessLoad
  public static Add: TProcessAdd
  public static Update: TProcessUpdate
  public static Delete: TProcessDelete
  public static Import: TProcessImport
  public static Export: TProcessExport

  public static extendRequest: any = extendRequestStub

  public act: TAct
  public itemType: string
  public fetcher: TFetcher | any
  public options: any
  public response: any
  public data: any

  constructor(
    act: TAct,
    itemType?: string,
    fetcher?: TFetcher | any,
    options?: any
  ) {
    this.act = act
    this.itemType = itemType || ''
    this.fetcher = fetcher
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

  setActive = (id: string | number) =>
    put(setActiveItem(this.itemType, String(id)))

  setItemProp = (prop: string, data: any) =>
    put(setItemProp(this.itemType, prop, data))

  set = (data: any, id?: string | number) => {
    if (!data) return
    if (id !== void 0) {
      return put(setItem(this.itemType, String(id), data))
    } else {
      if (!Array.isArray(data)) data = [data]
      return put(setItems(this.itemType, data))
    }
  };

  *fetch(params?: any): any {
    if (this.fetcher) {
      const request = yield this.createRequest(params)
      this.response = yield call(this.fetcher, request)
    }
  }

  *createRequest(request?: any): any {
    request = request || {}
    request.itemType = this.itemType
    request.act = this.act
    request.options = this.options

    if (this.options.pageble) {
      request.page = yield this.page()
      request.pageSize = yield this.pageSize()
      request.filters = yield this.filters()
      request.sorting = yield this.sorting()
    }

    request = yield Process.extendRequest(request)
    return request
  }
}

class ProcessLoad extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Load, itemType, fetcher, options)
  }
}

class ProcessAdd extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Add, itemType, fetcher, options)
  }
}

class ProcessUpdate extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Update, itemType, fetcher, options)
  }
}

class ProcessDelete extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Delete, itemType, fetcher, options)
  }
}

class ProcessImport extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Import, itemType, fetcher, options)
  }
}

class ProcessExport extends Process {
  constructor(itemType: string, fetcher?: any, options?: any) {
    super(Acts.Export, itemType, fetcher, options)
  }
}

Process.Load = ProcessLoad
Process.Add = ProcessAdd
Process.Update = ProcessUpdate
Process.Delete = ProcessDelete
Process.Import = ProcessImport
Process.Export = ProcessExport
