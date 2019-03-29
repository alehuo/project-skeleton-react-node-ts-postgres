import { Dispatch } from 'redux'
import { postJSON, deleteJSON } from '../fetch'
import { Omit, assoc, dissoc } from 'ramda'
import { Task } from '../../src-common/entity/Task'
import { arrayToByIdObject } from '../helpers'

interface TasksById {
  [key: string]: Task
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

type TaskAction = ReceiveTasks | AddTask | DeleteTask

export type TasksState = TasksById

const taskReducer = (state: TasksState = {}, action: TaskAction) => {
  switch (action.type) {

    case 'RECEIVE-TASKS':
      return arrayToByIdObject(action.tasks)

    case 'ADD-TASK':
      return assoc(action.task.id.toString(), action.task, state)

    case 'DELETE-TASK':
      const delState: TasksById = dissoc(action.taskid.toString(), state)
      return delState

    default:
      return state
  }
}

export const receiveTasks = (tasks: Task[]): ReceiveTasks => {
  console.log('received:', tasks)
  return {
    type: 'RECEIVE-TASKS',
    tasks
  }
}

export const addTask = (taskName: string, ownerId: string, sortindex: number ) => {
  const body: Omit<Task, 'id'> = { 
    name: taskName, 
    owner: Number(ownerId), 
    sortindex: sortindex
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

export default taskReducer