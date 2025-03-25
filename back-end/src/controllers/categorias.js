import prisma from "../database/client.js";

const controller = {}; // Objeto vazio

controller.create = async function (req, res) {
  /* Conecta-se ao BD e envia uma instrução de criação de um novo documento, 
  contendo os dados que vieram dentro de req.body */

  try {
    await prisma.categoria.create({ data: req.body });

    // Envia uma mensagem de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).send("Categoria criada com sucesso");
  } catch (error) {
    // Deu errado: exibe o erro no terminal
    console.error(error);

    // Envia ao front-end, com status de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error.message);
  }
};

export default controller;
