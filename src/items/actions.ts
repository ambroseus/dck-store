import { Action } from '../types'
import { composeAction } from '../utils'

export function setItems(itemType: string, data: any[]): Action {
  return composeAction('set-items', { itemType, data })
}

export function updateItem(itemType: string, id: string, data: any): Action {
  return composeAction('update-item', { itemType, id, data })
}

export function setItemData(
  itemType: string,
  field: string,
  data: any
): Action {
  return composeAction('set-item-data', { itemType, field, data })
}
