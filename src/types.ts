/* istanbul ignore file */
export { TProcess, TProcessInstance } from './helpers/processes'

export interface IState {
  [propName: string]: any
}

export interface IAction {
  type: string
  meta: {
    itemType: string
    id: string
    field: string
  }
  payload: any
}

export type TFetcher = (request: any) => any

export enum ActionTypes {
  // items
  setItems = 'dck:setItems',
  setItem = 'dck:setItem',
  removeItem = 'dck:removeItem',
  setActiveItem = 'dck:setActiveItem',
  setSelectedItem = 'dck:setSelectedItem',
  // crud items
  loadItems = 'dck:loadItems',
  addItem = 'dck:addItem',
  updateItem = 'dck:updateItem',
  deleteItem = 'dck:deleteItem',
  importItems = 'dck:importItems',
  exportItems = 'dck:exportItems',
  // itemProps
  setItemProp = 'dck:setItemProp',
  // filters
  setFilters = 'dck:setFilters',
  setFilter = 'dck:setFilter',
  removeFilter = 'dck:removeFilter',
  // sorting
  setSortFields = 'dck:setSortFields',
  setSortField = 'dck:setSortField',
  removeSortField = 'dck:removeSortField',
  // processes
  processStart = 'dck:processStart',
  processStop = 'dck:processStop',
  processFail = 'dck:processFail',
  processReset = 'dck:processRestart',
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
