import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {} // Objeto vazio

controller.create = async function (req, res) {
  /* Conecta-se ao BD e envia uma instrução de criação
     de um novo documento, contendo os dados que vieram
     dentro de req.body
  */
  try {
    await prisma.categoria.create({ data: req.body })
    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function (req, res) {
  const include = includeRelations(req.query)
  try {
    const result = await prisma.categoria.findMany({
      include,
      orderBy: [{ descricao: 'asc' }]
    })
    res.send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.categoria.findUnique({
      include,
      where: { id: req.params.id }
    })
    if (result) res.send(result)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function (req, res) {
  try {
    await prisma.categoria.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.delete = async function (req, res) {
  try {
    await prisma.categoria.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
