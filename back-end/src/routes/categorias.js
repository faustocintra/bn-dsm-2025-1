import { Router } from 'express'
import categorias from '../controllers/categorias.js';

const router = Router()

router.post('/', categorias.create)


export default router