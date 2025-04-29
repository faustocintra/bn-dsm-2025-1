import prisma from "../database/client.js"
import { includeRelations } from "../lib/utils.js"
const controller = {}

controller.create = async function (req, res) {
    try {
        const fornecedor = await prisma.fornecedor.create({
            data: req.body
        })
        res.status(201).json({
            message: "Fornecedor criado com sucesso",
            data: fornecedor
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao criar novo fornecedor: " + error.message
        })
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const fornecedores = await prisma.fornecedor.findMany({
            orderBy: {
                razao_social: 'asc'
            },
            include: includeRelations(req.query)
        })
        res.status(200).json(fornecedores)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao buscar fornecedores: " + error.message
        })
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const fornecedor = await prisma.fornecedor.findUnique({
            where: { id: req.params.id },
            include: includeRelations(req.query)
        })

        if (!fornecedor) {
            return res.status(404).json({
                message: "Fornecedor não encontrado"
            })
        }

        res.status(200).json(fornecedor)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao buscar fornecedor: " + error.message
        })
    }
}

controller.update = async function (req, res) {
    try {
        const fornecedor = await prisma.fornecedor.update({
            where: { id: req.params.id },
            data: req.body
        })
        res.status(200).json(fornecedor)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao atualizar fornecedor: " + error.message
        })
    }
}

controller.delete = async function (req, res) {
    try {
        await prisma.fornecedor.delete({
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
