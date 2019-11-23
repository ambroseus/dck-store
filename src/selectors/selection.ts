import { getItemState } from '../helpers'
import { State } from '../types'

export function areAllItemsSelected(state: State, itemType: string): boolean {
  return Boolean(getItemState(state, itemType).allItemsSelected)
}

export function isItemSelected(
  state: State,
  itemType: string,
  id: string
): boolean {
  const { selectedItems } = getItemState(state, itemType)
  if (!selectedItems) return false
  return String(id) in selectedItems
}

export function getSelectedItemIds(state: State, itemType: string): string[] {
  const { selectedItems } = getItemState(state, itemType)
  if (!selectedItems) return []
  return Object.keys(selectedItems)
}

export function getSelectedItems(state: State, itemType: string): any[] {
  const { selectedItems, items } = getItemState(state, itemType)
  if (!selectedItems) return []
  const selectedIds = getSelectedItemIds(state, itemType)
  return selectedIds.map((id: string) => items[selectedItems[id]])
}
