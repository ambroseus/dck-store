export { TProcess } from './helpers/processes'
export type TFetcher = (request: any) => any

export interface IState {
  [propName: string]: any
}

export interface IAction {
  type: string
  meta: {
    itemType: string
    id: string | number
    field: string
  }
  payload: any
}

export enum ActionTypes {
  // items
  setItems = 'dck/items/setItems',
  setItem = 'dck/items/setItem',
  removeItem = 'dck/items/removeItem',
  optItem = 'dck/items/optItem',
  selectItem = 'dck/items/selectItem',
  // crud items
  loadItems = 'dck/crud/loadItems',
  addItem = 'dck/crud/addItem',
  updateItem = 'dck/crud/updateItem',
  deleteItem = 'dck/crud/deleteItem',
  importItems = 'dck/crud/importItems',
  exportItems = 'dck/crud/exportItems',
  // itemProps
  setItemProp = 'dck/itemProps/setItemProp',
  // filters
  setFilters = 'dck/filters/setFilters',
  setFilter = 'dck/filters/setFilter',
  removeFilter = 'dck/filters/removeFilter',
  // sorting
  setSortFields = 'dck/sorting/setSortFields',
  setSortField = 'dck/sorting/setSortField',
  removeSortField = 'dck/sorting/removeSortField',
  // processes
  processStart = 'dck/processes/processStart',
  processStop = 'dck/processes/processStop',
  processFail = 'dck/processes/processFail',
  processReset = 'dck/processes/processRestart',
}

export enum ItemProps {
  totalItems = 'totalItems',
  totalPages = 'totalPages',
  currentPage = 'currentPage',
  pageSize = 'pageSize',
}

export enum Acts {
  Load = 'Load',
  Add = 'Add',
  Update = 'Update',
  Delete = 'Delete',
  Import = 'Import',
  Export = 'Export',
  Active = 'Active',
  Select = 'Select',
}

export type TAct = Acts | string
