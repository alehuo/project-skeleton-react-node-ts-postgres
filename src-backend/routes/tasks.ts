import { Request, Response, Router } from 'express'
import { getTasks, createTask } from '../database/taskQueries'
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

export default router