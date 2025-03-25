import prisma from "../database/client.js"

const controller = {}

controller.create = async function (req, res) {
    try {
        const categoria = await prisma.categoria.create({
            data: req.body
        })
        res.status(201).json({
            message: "Categoria criada com sucesso",
            data: categoria
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Erro ao criar nova categoria: " + error.message
        })
    }
}

export default controller
