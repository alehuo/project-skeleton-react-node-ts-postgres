import { Dispatch } from 'redux'
import { postJSON } from '../fetch'
import { Omit, assoc } from 'ramda'
import { Task } from '../../src-common/entity/Task'
import { arrayToByIdObject } from '../helpers'

interface ProjectById {
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

type TaskAction = ReceiveTasks | AddTask

export type TasksState = ProjectById

const taskReducer = (state: TasksState = {}, action: TaskAction) => {
  switch (action.type) {

    case 'RECEIVE-TASKS':
      return arrayToByIdObject(action.tasks)

    case 'ADD-TASK':
      return assoc(action.task.id.toString(), action.task, state)

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
    const task: Task = await postJSON('/api/project', body)
    console.log(task)
    return dispatch({
      type: 'ADD-TASK',
      task
    })
  }
}

export default taskReducer