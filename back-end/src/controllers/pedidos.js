import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

controller.create = async function(req, res) {
  try {
    const { itens, ...pedidoData } = req.body

    await prisma.pedido.create({
      data: {
        ...pedidoData,
        itens: {
          create: itens
        }
      }
    })

    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.pedido.findMany({
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true
          }
        }
      },
      orderBy: [{ num_pedido: 'asc' }]
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
    const include = includeRelations(req.query)
    const result = await prisma.pedido.findUnique({
      include,
      where: { id: req.params.id }
    })
    if (result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    await prisma.pedido.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()
  }
  catch(error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.pedido.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  }
  catch(error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.createItem = async function(req, res) {
  try {
    req.body.pedido_id = req.params.id
    await prisma.itemPedido.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAllItems = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.itemPedido.findMany({
      where: { pedido_id: req.params.id },
      orderBy: [{ num_item: 'asc' }],
      include
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOneItem = async function(req, res) {
  try {
    const result = await prisma.itemPedido.findFirst({
      where: {
        id: req.params.itemId,
        pedido_id: req.params.id
      }
    })
    if (result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.updateItem = async function(req, res) {
  try {
    await prisma.itemPedido.update({
      where: {
        id: req.params.itemId,
        pedido_id: req.params.id
      },
      data: req.body
    })
    res.status(204).end()
  }
  catch(error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.deleteItem = async function(req, res) {
  try {
    await prisma.itemPedido.delete({
      where: {
        id: req.params.itemId,
        pedido_id: req.params.id
      }
    })
    res.status(204).end()
  }
  catch(error) {
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
