import { Router } from 'express'
import produtos from '../controllers/produtos.js';

const router = Router()

router.post('/', produtos.create)
router.get('/', produtos.retrieveAll)
router.get('/:id', produtos.retrieveOne)
router.put('/:id', produtos.update)
router.delete('/:id', produtos.delete)

export default router