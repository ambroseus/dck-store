import { useDispatch } from 'react-redux'
import { dckActions } from '..'

export function useLoadItems(itemType: string): any {
  const dispatch = useDispatch()
  const loadItems = () => dispatch(dckActions.loadItems(itemType))
  return loadItems
}
