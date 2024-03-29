import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { select, dispatcher } from '../helpers/hooks'

import {
  getItems,
  getItem,
  getOptedItem,
  getOptedItemId,
  isItemSelected,
  getSelectedItemIds,
  getSelectedItems,
} from './selectors'

import { setItems, setItem, removeItem, optItem, selectItem } from './actions'

// selectors hooks

export const useItems = (itemType: string): any[] =>
  useSelector(select(getItems, itemType))

export const useItem = (itemType: string, id: string | number): any[] =>
  useSelector(select(getItem, itemType, id), shallowEqual)

export const useOptedItem = (itemType: string): any =>
  useSelector(select(getOptedItem, itemType), shallowEqual)

export const useOptedItemId = (itemType: string): string | number =>
  useSelector(select(getOptedItemId, itemType))

export const useItemSelected = (
  itemType: string,
  id: string | number
): boolean => useSelector(select(isItemSelected, itemType, id))

export const useSelectedItems = (itemType: string): any[] =>
  useSelector(select(getSelectedItems, itemType))

export const useSelectedItemsIds = (itemType: string): any[] =>
  useSelector(select(getSelectedItemIds, itemType))

// dispatchers hooks

export type TSetItems = (items: any[]) => any
export const useSetItems = (itemType: string): TSetItems =>
  dispatcher(useDispatch(), setItems, itemType)

export type TSetItem = (id: string | number, item: any) => any
export const useSetItem = (itemType: string): TSetItem =>
  dispatcher(useDispatch(), setItem, itemType)

export type TRemoveItem = (id: string | number) => any
export const useRemoveItem = (itemType: string): TRemoveItem =>
  dispatcher(useDispatch(), removeItem, itemType)

export type TOptItem = (id: string | number | undefined) => any
export const useOptItem = (itemType: string): TOptItem =>
  dispatcher(useDispatch(), optItem, itemType)

export type TSelectItem = (id: string | number, selected: boolean) => any
export const useSelectItem = (itemType: string): TSelectItem =>
  dispatcher(useDispatch(), selectItem, itemType)
