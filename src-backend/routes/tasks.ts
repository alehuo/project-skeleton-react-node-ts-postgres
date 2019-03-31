import { Request, Response, Router } from 'express'
import { getTasks, createTask, deleteTask, changeTaskStatus, moveTaskUp, moveTaskDown } from '../database/taskQueries'
import { Task } from '../../src-common/entity/Task';
import { server_log_info, server_log_error } from '../server_loggers';

const router = Router()

router.get('/api/v1/tasks', async (request: Request, response: Response) => {
  server_log_info('GET /api/v1/tasks')
  const queryResult = await getTasks()
  response.send({ tasks: queryResult })
})

router.post('/api/v1/task', async (request: Request, response: Response) => {
  server_log_info('POST /api/v1/task')
  const newTask: Task = request.body
  const queryResult = await createTask(newTask)
  response.send({ task: queryResult})
})

router.delete('/api/v1/task/:taskid', async (request: Request, response: Response) => {
  server_log_info('DELETE /api/v1/task/:taskid')
  try {
    await deleteTask(request.params.taskid)
    response.status(200)
    response.send({})
  } catch (error) {
    server_log_error(error)
    response.status(404)
    response.send({})
  }
})

router.patch('/api/v1/task/:taskid/status/:taskstatus', async (request: Request, response: Response) => {
  server_log_info('PATCH /api/v1/task/:taskid/status/:taskstatus')
  const id = request.params.taskid
  const status = request.params.taskstatus
  try {
    await changeTaskStatus(id, status)
    response.status(200)
    response.send({})
  } catch (error) {
    server_log_error(error)
    response.status(404)
    response.send({})
  }
})

router.patch('/api/v1/movetaskup/:taskid', async (request: Request, response: Response) => {
  server_log_info('PATCH /api/v1/movetaskup/:taskid')
  await moveTaskUp(request.params.taskid)
  response.send({})
})

router.patch('/api/v1/movetaskdown/:taskid', async (request: Request, response: Response) => {
  server_log_info('PATCH /api/v1/movetaskdown/:taskid')
  await moveTaskDown(request.params.taskid)
  response.send({})
})

export default router