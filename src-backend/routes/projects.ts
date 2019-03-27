import { Request, Response, Router } from 'express'
import { Task } from '../../src-common/entity/Task';

const router = Router()

const samples: Task[] = [
  { id: 1, name: "Wash dishes", sortIndex: 1, owner: 123 },
  { id: 2, name: "Vacuum the house", sortIndex: 2, owner: 123 },
  { id: 3, name: "Do the laundry", sortIndex: 4, owner: 123 },
  { id: 4, name: "Take the trash", sortIndex: 3, owner: 123 },
]

router.get('/api/v1/projects', async (request: Request, response: Response) => {
  response.send({ tasks: samples })
})

export default router