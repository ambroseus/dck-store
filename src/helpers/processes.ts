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
export type TProcessInstance = InstanceType<TProcess>

export class Process {
  public static Load: TProcess
  public static Add: TProcess
  public static Update: TProcess
  public static Delete: TProcess
  public static Import: TProcess
  public static Export: TProcess

  public act: Acts
  public itemType: string
  public provider: TDataProvider
  public options: any
  public response: any
  public data: any

  constructor(
    act: Acts,
    itemType?: string,
    provider?: TDataProvider,
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

  stop = (response: any) => put(processStop(this.itemType, this.act, response))

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
  }

  request(request: any): void {
    if (this.provider?.request) call(this.provider.request, this, request)
  }

  normalizeResponse = response => (this.response = response)
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
