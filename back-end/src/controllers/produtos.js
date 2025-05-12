import prisma from "../database/client.js"
import { includeRelations } from "../lib/utils.js"

const controller = {}

controller.create = async function (req, res) {
    try {
        const produto = await prisma.produto.create({
            data: req.body
        })
        res.status(201).json({
            message: "Produto criado com sucesso",
            data: produto
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao criar novo produto: " + error.message
        })
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const produtos = await prisma.produto.findMany({
            orderBy: {
                nome: 'asc'
            },
            include: includeRelations(req.query)
        })
        res.status(200).json(produtos)
    }

    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao buscar produtos: " + error.message
        })
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: req.params.id },
            include: includeRelations(req.query)
        })
        if (!produto) {
            return res.status(404).json({
                message: "Produto não encontrado"
            })
        }

        res.status(200).json(produto)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao buscar produto: " + error.message
        })
    }
}

controller.update = async function (req, res) {
    try {
        const produto = await prisma.produto.update({
            where: { id: req.params.id },
            data: req.body
        })
        res.status(204).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao atualizar produto: " + error.message
        })
    }
}

controller.delete = async function (req, res) {
    try {
        await prisma.produto.delete({
            where: { id: req.params.id }
        })

        res.status(204).end()
    }
    catch (error) {
        if (error?.code === 'P2025') {
            res.status(404).end()
        }
        else {
            console.error(error)
            res.status(500).send(error)
        }
    }
}


export default controller
