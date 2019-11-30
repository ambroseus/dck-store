import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { select, dispatcher } from '../helpers/hooks'

import { getItems, getItem, getOptedItem, getOptedItemId } from './selectors'
import { setItems, optItem } from './actions'

// selectors

export const useItems = (itemType: string): any[] =>
  useSelector(select(getItems, itemType), shallowEqual)

export const useItem = (itemType: string, id: string | number): any[] =>
  useSelector(select(getItem, itemType, id), shallowEqual)

export const useOptedItem = (itemType: string): any =>
  useSelector(select(getOptedItem, itemType), shallowEqual)

export const useOptedItemId = (itemType: string): any =>
  useSelector(select(getOptedItemId, itemType), shallowEqual)

// dispatchers

export function useSetItems(itemType: string, items: any[]): any {
  const dispatch = useDispatch()
  return dispatcher(dispatch, setItems(itemType, items))
}
export function useOptItem(itemType: string, id: string | number): any {
  const dispatch = useDispatch()
  return dispatcher(dispatch, optItem(itemType, id))
}
