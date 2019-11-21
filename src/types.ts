export interface State {
  [propName: string]: any
}

export interface Action {
  type: string
  payload: {
    id: string
    data: any
    [propName: string]: any
  }
  meta: {
    itemType: string
    field: string
  }
}

export interface SelectorProps {
  itemId: string
  itemType: string
}
