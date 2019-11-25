import { put, select } from 'redux-saga/effects'

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

type TProcess = typeof Process

export class Process {
  public static Load: TProcess
  public static Add: TProcess
  public static Update: TProcess
  public static Delete: TProcess
  public static Import: TProcess
  public static Export: TProcess

  public act: Acts
  public itemType: string
  public dataProvider: any
  public options: any
  public response: any
  public data: any

  constructor(act: Acts, itemType?: string, dataProvider?: any, options?: any) {
    this.act = act
    this.itemType = itemType || ''
    this.dataProvider = dataProvider
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
}

class ProcessLoad extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Load, itemType, dataProvider, options)
  }
}

class ProcessAdd extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Add, itemType, dataProvider, options)
  }
}

class ProcessUpdate extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Update, itemType, dataProvider, options)
  }
}

class ProcessDelete extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Delete, itemType, dataProvider, options)
  }
}

class ProcessImport extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Import, itemType, dataProvider, options)
  }
}

class ProcessExport extends Process {
  constructor(itemType: string, dataProvider?: any, options?: any) {
    super(Acts.Export, itemType, dataProvider, options)
  }
}

Process.Load = ProcessLoad
Process.Add = ProcessAdd
Process.Update = ProcessUpdate
Process.Delete = ProcessDelete
Process.Import = ProcessImport
Process.Export = ProcessExport
