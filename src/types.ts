export interface State {
  [propName: string]: any
}

export interface Action {
  type: string
  payload: {
    data: any
    field: string
    id: string
  }
  meta: {
    itemType: string
  }
}
