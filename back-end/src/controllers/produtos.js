import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {
    // Cria o produto
    const novoProduto = await prisma.produto.create({ 
      data: req.body,
      include: {
        fornecedores: true
      }
    })

    // Se houver fornecedores associados, atualiza cada um deles
    if(req.body.fornecedor_ids?.length > 0) {
      await Promise.all(
        req.body.fornecedor_ids.map(fornecedorId =>
          prisma.fornecedor.update({
            where: { id: fornecedorId },
            data: {
              produto_ids: {
                push: novoProduto.id
              }
            }
          })
        )
      )
    }

    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.produto.findMany({
      include,
      orderBy: [ { nome: 'asc' } ]
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
    const result = await prisma.produto.findUnique({
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

controller.update = async function(req, res) {
  try {
    if(req.body.fornecedor_ids) {
      const updatedProduto = await prisma.produto.update({
        where: { id: req.params.id },
        data: req.body,
        include: { fornecedores: true }
      })
      await Promise.all(
        req.body.fornecedor_ids.map(fornecedorId =>
          prisma.fornecedor.update({
            where: { id: fornecedorId },
            data: {
              produto_ids: {
                push: req.params.id
              }
            }
          })
        )
      )
    } else {
      await prisma.produto.update({
        where: { id: req.params.id },
        data: req.body
      })
    }
    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
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
    await prisma.produto.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller