import { Dispatch } from 'redux'

interface SetActiveTask {
  type: 'SET-ACTIVE-TASK'
  taskId: number
}

type UiAction =  SetActiveTask

export interface UiState {
  activeTask: number
}

const initialState = {
  activeTask: 0
}

const uiReducer = (state: UiState = initialState, action: UiAction) => {
  switch (action.type) {
    case 'SET-ACTIVE-TASK':
      return { ...state, activeTask: action.taskId }

      default:
      return state
  }
}

export const setActiveTask = (chosenTask: number) => {
  return async (dispatch: Dispatch<UiAction>) => {
    return dispatch({
      type: 'SET-ACTIVE-TASK',
      taskId: chosenTask
    })
  }
}

export default uiReducer
