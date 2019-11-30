import { useSelector, useDispatch, shallowEqual as shallow } from 'react-redux'
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

import { setItems, optItem } from './actions'

// selectors hooks

export const useItems = (itemType: string): any[] =>
  useSelector(select(getItems, itemType), shallow)

export const useItem = (itemType: string, id: string | number): any[] =>
  useSelector(select(getItem, itemType, id), shallow)

export const useOptedItem = (itemType: string): any =>
  useSelector(select(getOptedItem, itemType), shallow)

export const useOptedItemId = (itemType: string): any =>
  useSelector(select(getOptedItemId, itemType), shallow)

export const useItemSelected = (
  itemType: string,
  id: string | number
): boolean => useSelector(select(isItemSelected, itemType, id), shallow)

export const useSelectedItems = (itemType: string): any[] =>
  useSelector(select(getSelectedItems, itemType), shallow)

export const useSelectedItemsIds = (itemType: string): any[] =>
  useSelector(select(getSelectedItemIds, itemType), shallow)

// dispatchers hooks

export const useSetItems = (itemType: string, items: any[]): any =>
  dispatcher(useDispatch(), setItems(itemType, items))

export const useOptItem = (itemType: string, id: string | number): any =>
  dispatcher(useDispatch(), optItem(itemType, id))
