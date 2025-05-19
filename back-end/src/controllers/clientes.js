import { PrismaClient } from '@prisma/client';

// Instância do PrismaClient
const prisma = new PrismaClient();
const controller = {};

// Função para criar um novo registro de cliente
controller.create = async function(req, res) {
  try {
    await prisma.cliente.create({ data: req.body });
    res.status(201).end(); // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

// Função para recuperar todos os registros de clientes
controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.cliente.findMany({
      orderBy: [{ nome: 'asc' }],
      include: {
    pedidos: true, 
  },
    });
    res.send(result); // HTTP 200: OK
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

// Função para recuperar um cliente específico pelo ID
  controller.retrieveOne = async function(req, res) {
    try {
    const result = await prisma.cliente.findUnique({
    where: { id: req.params.id },
    include: {
    pedidos: true, 
  },
});

    if (result) {
      res.send(result); // HTTP 200: OK
    } else {
      res.status(404).send({ message: 'Cliente não encontrado' }); // HTTP 404: Not Found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

// Atualização de cliente
controller.update = async function(req, res) {
  try {
    await prisma.cliente.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(204).end(); // HTTP 204: No Content
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end(); // HTTP 404: Not Found
    } else {
      console.error(error);
      res.status(500).send(error); // HTTP 500: Internal Server Error
    }
  }
};

// Exclusão de cliente
controller.delete = async function(req, res) {
  try {
    // Busca o documento a ser excluído pelo id passado
    // como parâmetro e efetua a exclusão, caso encontrado
    await prisma.cliente.delete({
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