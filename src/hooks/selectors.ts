import { useSelector, shallowEqual } from 'react-redux'
import { dckSelectors, Acts } from '..'

export function useItems(itemType: string): any[] {
  const items = useSelector(
    (state: any) => dckSelectors.getItems(state, itemType),
    shallowEqual
  )
  return items
}

export function useActiveItem(itemType: string): any {
  const activeItem = useSelector(
    (state: any) => dckSelectors.getOptedItem(state, itemType),
    shallowEqual
  )
  return activeItem
}

export function useItemsLoading(itemType: string): boolean {
  const loading = useSelector(
    (state: any) => dckSelectors.isProcessRunning(state, itemType, Acts.Load),
    shallowEqual
  )
  return loading
}
