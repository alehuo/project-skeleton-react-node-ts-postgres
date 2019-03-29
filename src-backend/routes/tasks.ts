import { Request, Response, Router } from 'express'
import { getTasks, createTask, deleteTask } from '../database/taskQueries'
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

export default router