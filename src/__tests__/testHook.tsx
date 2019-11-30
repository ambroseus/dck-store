import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { dckReducer } from '../dck/reducer'
import { stateAfterLoadSaga as preloadedState } from './testData'

const store = configureStore({
  reducer: combineReducers({
    dck: dckReducer,
  }),
  preloadedState,
})

export function testHook(runHook: any) {
  const HookWrapper: React.FC = () => {
    const output = runHook()
    return <pre data-testid="output">{JSON.stringify(output)}</pre>
  }

  return render(
    <Provider store={store}>
      <HookWrapper />
    </Provider>
  )
}
