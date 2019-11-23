export interface State {
  [propName: string]: any
}

export interface Action {
  type: string
  payload: {
    data: any
    [propName: string]: any
  }
  meta: {
    itemType: string
    id: string
    field: string
  }
}
