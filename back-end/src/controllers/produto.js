import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

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
    // 1) pego todas as flags/includes que o usuário pediu
    const include = includeRelations(req.query)
    // 2) separo as flags internas (_fornecedor, _categoria) dos includes válidos
    const { _fornecedor, _categoria, ...prismaInclude } = include

    // 3) busco produtos com *apenas* os includes que o Prisma conhece
    const produtos = await prisma.produto.findMany({
      include: prismaInclude,
      orderBy: [{ nome: 'asc' }]
    })

    // 4) se pediu categoria, carrego todas de uma vez
    let categoriaMap = {}
    if (_categoria) {
      const idsCat = Array.from(new Set(produtos.map(p => p.categoria_id)))
      const categorias = await prisma.categoria.findMany({
        where: { id: { in: idsCat } }
      })
      categoriaMap = Object.fromEntries(categorias.map(c => [c.id, c]))
    }

    // 5) se pediu fornecedor, carrego todos de uma vez
    let fornecedorMap = {}
    if (_fornecedor) {
      const idsForn = Array.from(new Set(produtos.flatMap(p => p.fornecedor_ids)))
      const fornecedores = await prisma.fornecedor.findMany({
        where: { id: { in: idsForn } }
      })
      fornecedorMap = Object.fromEntries(fornecedores.map(f => [f.id, f]))
    }

    // 6) monto o resultado final anexando manualmente
    const result = produtos.map(produto => ({
      ...produto,
      ...( _categoria  && { categoria: categoriaMap[produto.categoria_id] || null }),
      ...( _fornecedor && { 
        fornecedores: produto.fornecedor_ids
          .map(id => fornecedorMap[id])
          .filter(Boolean)
      })
    }))

    return res.json(result)
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const { _fornecedor, _categoria, ...prismaInclude } = include

    const produto = await prisma.produto.findUnique({
      where: { id: req.params.id },
      include: prismaInclude
    })
    if (!produto) return res.status(404).end()

    let categoria = null, fornecedores = []
    if (_categoria) {
      categoria = await prisma.categoria.findUnique({
        where: { id: produto.categoria_id }
      })
    }
    if (_fornecedor) {
      fornecedores = await prisma.fornecedor.findMany({
        where: { id: { in: produto.fornecedor_ids } }
      })
    }

    return res.json({
      ...produto,
      ...( _categoria  && { categoria }),
      ...( _fornecedor && { fornecedores })
    })
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    // Se houver fornecedor_ids no body da requisição
    if(req.body.fornecedor_ids) {
      // Primeiro, atualiza o produto
      const updatedProduto = await prisma.produto.update({
        where: { id: req.params.id },
        data: req.body,
        include: { fornecedores: true }
      })

      // Depois, atualiza todos os fornecedores relacionados
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
      // Se não houver fornecedor_ids, apenas atualiza o produto normalmente
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
    // Busca o documento a ser excluído pelo id passado
    // como parâmetro e efetua a exclusão, caso encontrado
    await prisma.produto.delete({
      where: { id: req.params.id }
    })

    // Encontrou e excluiu ~> retorna HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    // P2025: erro do Prisma referente a objeto não encontrado
    if(error?.code === 'P2025') {
      // Não encontrou e não excluiu ~> retorna HTTP 404: Not Found
      res.status(404).end()
    }
    else {    // Outros tipos de erro
      // Deu errado: exibe o erro no terminal
      console.error(error)

      // Envia o erro ao front-end, com status de erro
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
    }
  }
}

export default controller
