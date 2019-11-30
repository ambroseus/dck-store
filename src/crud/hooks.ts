import { useDispatch } from 'react-redux'
import { dispatcher } from '../helpers/hooks'

import {
  loadItems,
  addItem,
  updateItem,
  deleteItem,
  importItems,
  exportItems,
} from './actions'

// dispatchers hooks

export const useLoadItems = (itemType: string): any =>
  dispatcher(useDispatch(), loadItems(itemType))

export const useAddItem = (itemType: string, item: any): any =>
  dispatcher(useDispatch(), addItem(itemType, item))

export const useUpdateItem = (
  itemType: string,
  id: string | number,
  item: any
): any => dispatcher(useDispatch(), updateItem(itemType, id, item))

export const useDeleteItem = (itemType: string, id: string | number): any =>
  dispatcher(useDispatch(), deleteItem(itemType, id))

export const useImportItems = (itemType: string): any =>
  dispatcher(useDispatch(), importItems(itemType))

export const useExportItems = (itemType: string): any =>
  dispatcher(useDispatch(), exportItems(itemType))
