export interface State {
  [propName: string]: any
}

export interface Action {
  type: string
  meta: {
    itemType: string
    id: string
    field: string
  }
  payload: any
}
