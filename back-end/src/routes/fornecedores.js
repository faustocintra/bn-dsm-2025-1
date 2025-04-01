import { Router } from "express";
import controller from "../controllers/Fornecedores.js";

const router = Router()

router.post('/', controller.create)
router.get('/', controller.orderBy)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)


export default router