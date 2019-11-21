export const getItems = (state: any, itemsType: string): any[] =>
  state.dck.items[itemsType].items

export const getItem = (state: any, itemsType: string, id: string): any => {
  const items = getItems(state, itemsType)
  if (!Array.isArray(items)) return void 0
  return items.find(el => String(el.id) === String(id))
}

export const getItemData = (
  state: any,
  itemsType: string,
  field: string
): any => state.dck.items[itemsType][field]

export const getActiveItemId = (state: any, itemsType: string): string =>
  getItemData(state, itemsType, 'activeItemId')

export const getActiveItem = (state: any, itemsType: string): string =>
  getItem(state, itemsType, getActiveItemId(state, itemsType))
