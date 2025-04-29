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
    const id = parseInt(req.params.id);

    const result = await prisma.cliente.findUnique({
      where: { id: id },
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
    await prisma.cliente.delete({
      where: { id: req.params.id },
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

export default controller;
