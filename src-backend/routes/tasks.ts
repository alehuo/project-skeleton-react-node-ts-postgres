import { Request, Response, Router } from 'express'
import { getTasks, createTask, deleteTask, changeTaskStatus, moveTaskUp, moveTaskDown } from '../database/taskQueries'
import { Task } from '../../src-common/entity/Task';

const router = Router()

router.get('/api/v1/tasks', async (request: Request, response: Response) => {
  const queryResult = await getTasks()
  response.send({ tasks: queryResult })
})

router.post('/api/v1/task', async (request: Request, response: Response) => {
  const newTask: Task = request.body
  const queryResult = await createTask(newTask)
  response.send({ task: queryResult})
})

router.delete('/api/v1/task/:taskid', async (request: Request, response: Response) => {
  console.log('delete endpoint')
  try {
    await deleteTask(request.params.taskid)
    response.status(200)
    response.send({})
  } catch {
    response.status(404)
    response.send({})
  }
})

router.patch('/api/v1/task/:taskid/status/:taskstatus', async (request: Request, response: Response) => {
  console.log('patch endpoint')
  const id = request.params.taskid
  const status = request.params.taskstatus
  try {
    await changeTaskStatus(id, status)
    response.status(200)
    response.send({})
  } catch (error) {
    console.log(error)
    response.status(404)
    response.send({})
  }
})

router.patch('/api/v1/movetaskup/:taskid', async (request: Request, response: Response) => {
  console.log('ENDPOINT: move up')
  await moveTaskUp(request.params.taskid)
  response.send({})
})

router.patch('/api/v1/movetaskdown/:taskid', async (request: Request, response: Response) => {
  console.log('ENDPOINT: move down')
  await moveTaskDown(request.params.taskid)
  response.send({})
})

export default router