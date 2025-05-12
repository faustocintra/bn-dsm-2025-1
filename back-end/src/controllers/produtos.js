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

    console.log({include})

    // Manda buscar os dados no servidor de BD
    const result = await prisma.produto.findMany({
      include,
      orderBy: [ { nome: 'asc' } ]
    })

    // Retorna os dados obtidos ao cliente com o status
    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com status de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda buscar o documento no servidor de BD
    // usando como critério de busca um id informado
    // no parâmetro da requisição
    const result = await prisma.produto.findUnique({
      include,
      where: { id: req.params.id }
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com status de erro
    // HTTP 500: Internal Server Error
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