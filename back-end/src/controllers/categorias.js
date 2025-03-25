import { PrismaClient } from '@prisma/client';

// Instância do PrismaClient
const prisma = new PrismaClient();

const controller = {};

// Função assíncrona para criar categoria
controller.create = async function(req, res) {
    try {
        // Cria uma nova categoria com os dados recebidos no corpo da requisição
        const categoria = await prisma.categoria.create({
            data: req.body
        });

        // Envia uma resposta de sucesso ao front-end
        res.status(201).json(categoria); // Retorna a categoria criada
    } catch (error) {
        // Exibe o erro no terminal
        console.error(error);

        // Envia o erro ao front-end com status 500 (Internal Server Error)
        res.status(500).send({ error: 'Erro ao criar categoria' });
    }
};

export default controller;
