export enum ActionTypes {
  // items
  setItems = 'dck:setItems',
  setItem = 'dck:setItem',
  removeItem = 'dck:removeItem',
  setItemProp = 'dck:setItemProp',
  setActiveItem = 'dck:setActiveItem',
  setSelectedItem = 'dck:setSelectedItem',
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
