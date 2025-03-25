import { PrismaClient } from '@prisma/client'

// Instanciando o PrismaClient
const prisma = new PrismaClient()

const controller = {}  // Objeto vazio

// Tornando a função 'create' assíncrona
controller.create = async function(req, res) {
    /* Conecta-se ao BD e envia uma instrução de criação de um novo documento
    Contendo os dados que vieram dentro de req.body
    */
   try {
        // Espera a criação da categoria ser concluída
        const categoria = await prisma.categoria.create({
            data: req.body
        })

        // Envia uma mensagem de sucesso ao frontend 
        // HTTP 201: Created
        res.status(201).json(categoria) // Retorna o objeto criado como resposta
   }
   catch(error) {
        // Deu errado: exibe erro no terminal
        console.error("Erro ao criar categoria:", error.message)

        // Envia o erro ao frontend com status de erro 
        // HTTP 500: Internal Server Error
        res.status(500).send({
            message: "Erro interno ao criar a categoria",
            error: error.message
        })
   }
}

export default controller
