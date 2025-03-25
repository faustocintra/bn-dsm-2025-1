import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const controller = {}

controller.create = async function (req, res) {
    try {
        // Aguarda a criação do registro
        await prisma.categoria.create({ data: req.body })

        // Envia uma mensagem de sucesso ao front-end.
        res.status(201).end()
    } catch (error) {
        console.error('Erro ao criar categoria:', error)

        // Envia o erro ao front-end, com status de erro.
        res.status(500).send({ error: 'Erro interno no servidor' })
    }
}

export default controller
