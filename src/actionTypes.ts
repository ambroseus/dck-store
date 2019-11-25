/* istanbul ignore file */
export enum ActionTypes {
  // items
  setItems = 'dck:setItems',
  setItem = 'dck:setItem',
  removeItem = 'dck:removeItem',
  setActiveItem = 'dck:setActiveItem',
  setSelectedItem = 'dck:setSelectedItem',
  loadItems = 'dck:loadItems',
  addItems = 'dck:addItems',
  updateItems = 'dck:updateItems',
  deleteItems = 'dck:deleteItems',
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
