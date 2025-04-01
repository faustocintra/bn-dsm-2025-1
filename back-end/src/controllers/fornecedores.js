import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {
    await prisma.fornecedor.create({ data: req.body })
    res.status(201).end()  // HTTP 201: Created
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)  // HTTP 500: Internal Server Error
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.fornecedor.findMany({
      orderBy: [ { nome: 'asc' } ]  // Atualize o campo de ordenação aqui
    })
    res.send(result)  // HTTP 200: OK (implícito)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.fornecedor.findUnique({
      where: { id: req.params.id }
    })
    if(result) res.send(result)
    else res.status(404).end()  // HTTP 404: Not Found
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    await prisma.fornecedor.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()  // HTTP 204: No Content
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()  // HTTP 404: Not Found
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.fornecedor.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()  // HTTP 204: No Content
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()  // HTTP 404: Not Found
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
