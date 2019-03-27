import { Request, Response, Router } from 'express'
import { getTasks } from '../database/taskQueries'

const router = Router()

router.get('/api/v1/projects', async (request: Request, response: Response) => {
  const queryResult = await getTasks()
  response.send({ tasks: queryResult })
})

export default router