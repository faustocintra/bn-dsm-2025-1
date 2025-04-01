import prisma from '../database/client.js'

const controller = {}

controller.create = async function(req, res) {
  try {
    const { nome, cnpj, endereco, telefone, email } = req.body
    const fornecedor = await prisma.fornecedor.create({
      data: {
        nome,
        cnpj,
        endereco,
        telefone,
        email
      }
    })
    res.status(201).send(fornecedor)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.orderBy = async function(req, res) {
    try {
      const result = await prisma.fornecedor.findMany({
        orderBy: [{ razao_social: 'asc' }] 
      })
  
      res.send(result)
    }
    catch(error) {
      console.error(error)
  
      res.status(500).send(error)
    }
  }  

controller.retrieveOne = async function(req, res) {
  try {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id: parseInt(req.params.id) }
    })
    if (fornecedor) res.send(fornecedor)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    const { nome, cnpj, endereco, telefone, email } = req.body
    const fornecedor = await prisma.fornecedor.update({
      where: { id: parseInt(req.params.id) },
      data: { nome, cnpj, endereco, telefone, email }
    })
    res.status(204).send(fornecedor)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
    try {
      const fornecedor = await prisma.fornecedor.delete({
        where: { id: parseInt(req.params.id) }
      })
      res.status(204).end() // HTTP 204: No Content (indica que foi excluído sem erro)
    } catch (error) {
      console.error(error)
      if (error.code === 'P2025') {
        // Erro específico do Prisma para objeto não encontrado
        res.status(404).send({ message: "Fornecedor não encontrado" })
      } else {
        res.status(500).send(error)
      }
    }
}
  
export default controller
