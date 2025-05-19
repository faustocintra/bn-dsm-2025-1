import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

// POST /pedidos
controller.create = async function(req, res) {
  try {
    const { num_pedido, cliente_id, itens } = req.body

    // Cria o pedido principal
    const novoPedido = await prisma.pedido.create({
      data: {
        num_pedido,
        cliente_id
      }
    })

    // Cria os itens vinculados
    await Promise.all(
      itens.map(item =>
        prisma.itemPedido.create({
          data: {
            num_item: item.num_item,
            quantidade: item.quantidade,
            produto_id: item.produto_id,
            pedido_id: novoPedido.id
          }
        })
      )
    )

    // Busca e retorna o pedido completo
    const pedidoCompleto = await prisma.pedido.findUnique({
      where: { id: novoPedido.id },
      include: {
        cliente: true,
        itens: {
          include: { produto: true }
        }
      }
    })

    res.status(201).json(pedidoCompleto)
  }
  catch(error) {
    console.error('Erro ao criar pedido:\n', JSON.stringify(error, null, 2))
    res.status(500).json({
      message: error.message,
      code: error.code,
      meta: error.meta
    })
  }
}

// GET /pedidos
controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    const result = await prisma.pedido.findMany({
      include,
      orderBy: [{ num_pedido: 'asc' }]
    })

    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// GET /pedidos/:id
controller.retrieveOne = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    const result = await prisma.pedido.findUnique({
      include,
      where: { id: req.params.id }
    })

    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// PUT /pedidos/:id
controller.update = async function(req, res) {
  try {
    await prisma.pedido.update({
      where: { id: req.params.id },
      data: req.body
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

// DELETE /pedidos/:id
controller.delete = async function(req, res) {
  try {
    const pedidoId = req.params.id

    await prisma.itemPedido.deleteMany({
      where: { pedido_id: pedidoId }
    })

    await prisma.pedido.delete({
      where: { id: pedidoId }
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

// POST /pedidos/:id/itens
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

// GET /pedidos/:id/itens
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

// GET /pedidos/:id/itens/:itemId
controller.retrieveOneItem = async function(req, res) {
  try {
    const result = await prisma.itemPedido.findFirst({
      where: {
        id: req.params.itemId,
        pedido_id: req.params.id
      }
    })

    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// PUT /pedidos/:id/itens/:itemId
controller.updateItem = async function(req, res) {
  try {
    await prisma.itemPedido.update({
      where: {
        id: req.params.itemId
      },
      data: req.body
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

// DELETE /pedidos/:id/itens/:itemId
controller.deleteItem = async function(req, res) {
  try {
    await prisma.itemPedido.delete({
      where: {
        id: req.params.itemId
      }
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
