import { Dispatch } from 'redux'
import { postJSON, deleteJSON, patchJSON } from '../fetch'
import { Omit, assoc, dissoc, append } from 'ramda'
import { Task } from '../../src-common/entity/Task'
import { arrayToByIdObject, moveItemUp, moveItemDown } from '../helpers'
import assocPath from 'ramda/es/assocPath';
import { logger_info, logger_error } from '../loggers';

interface TasksById {
  [key: string]: Task
}

interface StateByKeys {
  byid: TasksById,
  orderOfTasks: number[]
}

interface ReceiveTasks {
  type: 'RECEIVE-TASKS'
  tasks: Task[]
}

interface AddTask {
  type: 'ADD-TASK'
  task: Task
}

interface DeleteTask {
  type: 'DELETE-TASK',
  taskid: number
}

interface MoveUp {
  type: 'MOVE-UP',
  taskid: number
}

interface MoveDown {
  type: 'MOVE-DOWN',
  taskid: number
}

interface ChangeStatus {
  type: 'CHANGE-STATUS',
  taskid: number,
  newStatus: string
}

type TaskAction = ReceiveTasks | AddTask | DeleteTask | MoveUp | MoveDown | ChangeStatus

export type TasksState = StateByKeys

const emptyState: TasksState = { byid: {}, orderOfTasks: [] }

const taskReducer = (state: TasksState = emptyState, action: TaskAction) => {
  switch (action.type) {

    case 'RECEIVE-TASKS':
      const orderArray = action.tasks
        .sort((a, b) => a.sortindex - b.sortindex)
        .map(task => task.id)

      const taskWithoutSortindex: Omit<Task, 'sortindex'>[] = action.tasks
          .map(task => dissoc('sortindex', task))

      return {
        byid: arrayToByIdObject(taskWithoutSortindex),
        orderOfTasks: orderArray
      }

    case 'ADD-TASK':
      return { ...state,
        byid: assoc(action.task.id.toString(), action.task, state.byid), 
        orderOfTasks: append(action.task.id, state.orderOfTasks )
      }

    case 'DELETE-TASK':
      return { ...state, 
        byid: dissoc(action.taskid.toString(), state.byid),
        orderOfTasks: state.orderOfTasks.filter(item => item !== action.taskid)
      }

    case 'MOVE-UP':
      return { ...state, orderOfTasks: moveItemUp(state.orderOfTasks, action.taskid) }

    case 'MOVE-DOWN':
      return { ...state, orderOfTasks: moveItemDown(state.orderOfTasks, action.taskid) }

    case 'CHANGE-STATUS':
      return assocPath(['byid', action.taskid, 'status'], action.newStatus, state)

    default:
      return state
  }
}

export const receiveTasks = (tasks: Task[]): ReceiveTasks => {
  logger_info('received:', tasks)
  return {
    type: 'RECEIVE-TASKS',
    tasks
  }
}

export const addTask = (taskName: string, ownerId: string, sortindex: number, status: string ) => {
  const body: Omit<Task, 'id'> = { 
    name: taskName, 
    owner: Number(ownerId), 
    sortindex: sortindex,
    status: status
  }
  return async (dispatch: Dispatch<TaskAction>) => {
    const { task } = await postJSON('/api/v1/task', body)
    return dispatch({
      type: 'ADD-TASK',
      task
    })
  }
}

export const deleteTask = (taskid: number) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    function onSuccess(success: any) {
      dispatch({
        type: 'DELETE-TASK',
        taskid
      })
    }
    function onError(error: any) {
      logger_error(error)
      alert('Could not delete')
    }
    
    try {
      const response = await deleteJSON(`/api/v1/task/${taskid}`)
      return onSuccess(response)
    } catch (error) {
      return onError(error)
    } 
  }
}

export const moveTaskUp = (taskid: number) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    patchJSON(`/api/v1/movetaskup/${taskid}`)
    return dispatch({
      type: 'MOVE-UP',
      taskid
    })
  }
}

export const moveTaskDown = (taskid: number) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    patchJSON(`/api/v1/movetaskdown/${taskid}`)
    return dispatch({
      type: 'MOVE-DOWN',
      taskid
    })
  }
}

export const changeTaskStatus = (taskid: number, newStatus: string) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    patchJSON(`/api/v1/task/${taskid}/status/${newStatus}`)
    return dispatch({
      type: 'CHANGE-STATUS',
      taskid,
      newStatus
    })
  }
}

export default taskReducer