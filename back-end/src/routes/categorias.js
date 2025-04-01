import { Router } from 'express'
import categorias from '../controllers/categorias.js';

const router = Router()

router.post('/', categorias.create)
router.get('/', categorias.retrieveAll)
router.get('/:id', categorias.retrieveOne)
router.put('/:id', categorias.update)
router.delete('/:id', categorias.delete)

export default router