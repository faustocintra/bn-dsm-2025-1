import prisma from '../database/client.js';
 
const controller = {};
 
// Função auxiliar para verificar se a tabela existe no Prisma
const checkModel = async () => {
  if (!prisma.fornecedores) {
    throw new Error("Modelo 'fornecedores' não encontrado no Prisma.");
  }
};
 
controller.create = async function (req, res) {
  try {
    await checkModel(); // Verifica se o modelo está definido
 
    await prisma.fornecedores.create({ data: req.body });
 
    res.status(201).end(); // Sucesso
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    res.status(500).json({ error: error.message });
  }
};
 
controller.retrieveAll = async function (req, res) {
  try {
    await checkModel();
 
    const result = await prisma.fornecedores.findMany({
      orderBy: [{ razao_social: 'asc' }],
    });
 
    res.send(result);
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    res.status(500).json({ error: error.message });
  }
};
 
controller.retrieveOne = async function (req, res) {
  try {
    await checkModel();
 
    const id = parseInt(req.params.id); // Garante que é um número
 
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
 
    const result = await prisma.fornecedores.findUnique({
      where: { id },
    });
 
    if (result) res.send(result);
    else res.status(404).json({ error: "Fornecedor não encontrado" });
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
    res.status(500).json({ error: error.message });
  }
};
 
controller.update = async function (req, res) {
  try {
    await checkModel();
 
    const id = parseInt(req.params.id);
 
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
 
    await prisma.fornecedores.update({
      where: { id },
      data: req.body,
    });
 
    res.status(204).end(); // Sucesso
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).json({ error: "Fornecedor não encontrado" });
    } else {
      console.error("Erro ao atualizar fornecedor:", error);
      res.status(500).json({ error: error.message });
    }
  }
};
 
controller.delete = async function (req, res) {
  try {
    await checkModel();
 
    const id = parseInt(req.params.id);
 
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
 
    await prisma.fornecedores.delete({
      where: { id },
    });
 
    res.status(204).end();
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).json({ error: "Fornecedor não encontrado" });
    } else {
      console.error("Erro ao excluir fornecedor:", error);
      res.status(500).json({ error: error.message });
    }
  }
};
 
export default controller;
