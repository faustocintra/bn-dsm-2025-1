import { PrismaClient } from '@prisma/client';

// Instância do PrismaClient
const prisma = new PrismaClient();
const controller = {};

// Função para criar um novo registro de categoria
controller.create = async function(req, res) {
  try {
    await prisma.categoria.create({ data: req.body });
    res.status(201).end(); // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

// Função para recuperar todos os registros de categorias
controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.categoria.findMany({
      orderBy: [{ descricao: 'asc' }],
    });
    res.send(result); // HTTP 200: OK
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

// Função para recuperar uma categoria específica pelo ID
controller.retrieveOne = async function(req, res) {
  try {
    // Pegamos o id da rota (req.params.id)
    const id = parseInt(req.params.id);

    // Busca a categoria pelo ID
    const result = await prisma.categoria.findUnique({
      where: { id: id },
    });

    // Verifica se a categoria foi encontrada
    if (result) {
      res.send(result); // HTTP 200: OK
    } else {
      res.status(404).send({ message: 'Categoria não encontrada' }); // HTTP 404: Not Found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
}

controller.update = async function(req, res) {
    try {
      // Busca o documento pelo id passado como parâmetro e,
      // caso o documento seja encontrado, atualiza-o com as
      // informações passadas em req.body
      await prisma.categoria.update({
        where: { id: req.params.id },
        data: req.body
      })
  
      // Encontrou e atualizou ~> retorna HTTP 204: No Content
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
  controller.delete = async function(req, res) {
    try {
      // Busca o documento a ser excluído pelo id passado
      // como parâmetro e efetua a exclusão, caso encontrado
      await prisma.categoria.delete({
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
  

export default controller;
