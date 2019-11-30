export const select = (selector: any, ...args: any[]) => (state: any) =>
  selector(state, ...args)

export const dispatcher = (dispatch: any, actionCreator: any) => () =>
  dispatch(actionCreator)
