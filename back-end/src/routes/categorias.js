import { Router } from 'express'
import controller from '../controllers/categorias.js'

const router = Router()

router.post('/', controller.create)
<<<<<<< HEAD
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
=======
>>>>>>> origin/main

export default router