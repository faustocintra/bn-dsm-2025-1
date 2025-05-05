<<<<<<< HEAD
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
=======
import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  /* Conecta-se ao BD e envia uma instrução de criação
     de um novo documento, contendo os dados que vieram
     dentro de req.body
  */
  try {
    await prisma.fornecedor.create({ data: req.body })

    // Envia uma mensagem de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com status de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda buscar os dados no servidor de BD
    const result = await prisma.fornecedor.findMany({
      include,
      orderBy: [ { razao_social: 'asc' } ]
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
    const result = await prisma.fornecedor.findUnique({
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
    // Busca o documento pelo id passado como parâmetro e,
    // caso o documento seja encontrado, atualiza-o com as
    // informações passadas em req.body
    await prisma.fornecedor.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    // P2025: erro do Prisma referente a objeto não encontrado
    if(error?.code === 'P2025') {
      // Não encontrou e não alterou ~> retorna HTTP 404: Not Found
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
    await prisma.fornecedor.delete({
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
>>>>>>> upstream/main
