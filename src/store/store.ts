import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import thunk from 'redux-thunk'
import uiReducer, { UiState } from './uiReducer'
import taskReducer, { TasksState } from './taskReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface StoreState {
  tasks: TasksState
  ui: UiState
}

const rootReducer: Reducer<StoreState> = combineReducers({
  tasks: taskReducer,
  ui: uiReducer
})

export const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)