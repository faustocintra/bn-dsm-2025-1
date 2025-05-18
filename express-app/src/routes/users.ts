import { Request, Response, Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.send('Fetched all users')
})

/* POST a user */
router.post('/', function (req: Request, res: Response) {
  res.send('Created a user')
})

/* PATCH a user */
router.patch('/', function (req: Request, res: Response) {
  res.send('Updated a user')
})

/* DELETE a user */
router.delete('/', function (req: Request, res: Response) {
  res.send('Deleted a user')
})

export default router
