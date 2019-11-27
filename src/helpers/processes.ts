import { call, put, select, PutEffect, SelectEffect } from 'redux-saga/effects'
import { Acts, TAct, TFetcher, IAction, ItemProps } from '../types'

import {
  getFilters,
  getSortFields,
  getCurrentPage,
  getPageSize,
  getItemProp,
} from '../dck/selectors'

import {
  processStart,
  processReset,
  processStop,
  processFail,
  setActiveItem,
  setItem,
  setItems,
  setItemProp,
  setCurrentPage,
  setPageSize,
  setTotalItems,
} from '../dck/actions'

export type TProcess = typeof Process
export type TProcessLoad = typeof ProcessLoad
export type TProcessAdd = typeof ProcessAdd
export type TProcessUpdate = typeof ProcessUpdate
export type TProcessDelete = typeof ProcessDelete
export type TProcessImport = typeof ProcessImport
export type TProcessExport = typeof ProcessExport

export class Process {
  public static [Acts.Load]: TProcessLoad
  public static [Acts.Add]: TProcessAdd
  public static [Acts.Update]: TProcessUpdate
  public static [Acts.Delete]: TProcessDelete
  public static [Acts.Import]: TProcessImport
  public static [Acts.Export]: TProcessExport

  public static extendRequest: any
  public static fetcher: TFetcher | undefined

  public act: TAct
  public itemType: string
  public options: any
  public response: any
  public data: any

  constructor(act: TAct, itemType?: string, options?: any) {
    this.act = act
    this.itemType = itemType || '__internal__'
    this.options = options || {}
  }

  *fetch(params?: any): any {
    const request = yield this.createRequest(params)
    const fetcher = Process.fetcher || this.options.fetcher
    if (fetcher) {
      this.response = yield call(fetcher, request)
      if (this.response?.data) this.data = this.response.data
      return yield this.response
    }
    return yield void 0
  }

  *createRequest(request?: any): any {
    request = request || {}
    request.itemType = this.itemType
    request.act = this.act

    if (this.options.pageble) {
      request[ItemProps.currentPage] = yield this.currentPage()
      request[ItemProps.pageSize] = yield this.pageSize()
      request.filters = yield this.filters()
      request.sorting = yield this.sorting()
    }

    request = yield Process.extendRequest(request)
    return request
  }

  filters = (): SelectEffect =>
    select(state => getFilters(state, this.itemType))

  sorting = (): SelectEffect =>
    select(state => getSortFields(state, this.itemType))

  currentPage = (): SelectEffect =>
    select(state => getCurrentPage(state, this.itemType))

  pageSize = (): SelectEffect =>
    select(state => getPageSize(state, this.itemType))

  itemProp = (prop: any): SelectEffect =>
    select(state => getItemProp(state, this.itemType, prop))

  start = (): PutEffect<IAction> => put(processStart(this.itemType, this.act))

  reset = (): PutEffect<IAction> => put(processReset(this.itemType, this.act))

  stop = (response?: any): PutEffect<IAction> =>
    put(processStop(this.itemType, this.act, response))

  fail = (response: any): PutEffect<IAction> =>
    put(processFail(this.itemType, this.act, response))

  setActiveItem = (id: string | number): PutEffect<IAction> =>
    put(setActiveItem(this.itemType, String(id)))

  setItemProp = (prop: string, data: any): PutEffect<IAction> =>
    put(setItemProp(this.itemType, prop, data))

  setCurrentPage = (currentPage: number): PutEffect<IAction> =>
    put(setCurrentPage(this.itemType, currentPage))

  setPageSize = (pageSize: number): PutEffect<IAction> =>
    put(setPageSize(this.itemType, pageSize))

  setTotalItems = (totalItems: number): PutEffect<IAction> =>
    put(setTotalItems(this.itemType, totalItems))

  setItems = (data?: any[]): PutEffect<IAction> => {
    if (!data) data = []
    return put(setItems(this.itemType, data))
  }

  setItem = (id: string | number, data: any): PutEffect<IAction> =>
    put(setItem(this.itemType, String(id), data))
}

Process.extendRequest = _extendRequest

function* _extendRequest(request: any): any {
  return yield request
}

class ProcessLoad extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Load, itemType, options)
  }
}

class ProcessAdd extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Add, itemType, options)
  }
}

class ProcessUpdate extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Update, itemType, options)
  }
}

class ProcessDelete extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Delete, itemType, options)
  }
}

class ProcessImport extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Import, itemType, options)
  }
}

class ProcessExport extends Process {
  constructor(itemType: string, options?: any) {
    super(Acts.Export, itemType, options)
  }
}

Process.Load = ProcessLoad
Process.Add = ProcessAdd
Process.Update = ProcessUpdate
Process.Delete = ProcessDelete
Process.Import = ProcessImport
Process.Export = ProcessExport
