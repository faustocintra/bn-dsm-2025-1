import { Router } from 'express'
import controller from './controller/categorias.js'


const router = Router()

router.post('/', controller.create)

export default router