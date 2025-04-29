import prisma from '../database/client.js'

const controller = {};   // Objeto vazio

// CREATE - Criar novo cliente
controller.create = async function(req, res) {
  try {
    await prisma.Cliente.create({ data: req.body });
    res.status(201).end();
  }
  catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// RETRIEVE ALL - Buscar todos os clientes
controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.Cliente.findMany({
      orderBy: [{ nome: 'asc' }]
    });
    res.send(result);
  }
  catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// RETRIEVE ONE - Buscar um cliente pelo ID
controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.Cliente.findUnique({
      where: { id: req.params.id }
    });
    if(result) res.send(result);
    else res.status(404).end();
  }
  catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// UPDATE - Atualizar cliente
controller.update = async function(req, res) {
  try {
    await prisma.Cliente.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.status(204).end();
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end();
    }
    else {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

// DELETE - Deletar cliente
controller.delete = async function(req, res) {
  try {
    await prisma.Cliente.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end();
    }
    else {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

export default controller;
