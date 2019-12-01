import { useCallback } from 'react'
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

export const useLoadItems = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, loadItems, itemType), [dispatch])
}

export const useAddItem = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, addItem, itemType), [dispatch])
}

export const useUpdateItem = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, updateItem, itemType), [dispatch])
}

export const useDeleteItem = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, deleteItem, itemType), [dispatch])
}

export const useImportItems = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, importItems, itemType), [dispatch])
}

export const useExportItems = (itemType: string): any => {
  const dispatch = useDispatch()
  return useCallback(dispatcher(dispatch, exportItems, itemType), [dispatch])
}
