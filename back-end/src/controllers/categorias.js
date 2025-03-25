import prisma from '../database/client.js'

const controller = {}  //objeto vazio

controller.create = async function(req, res) {
    /*Conecta-se ao BD e envia uma instrução de criação de um novo documento,
    contendo os dados que vieram dentro do req.body */ 
    try {
        prisma.categoria.create({ data: req.body })

        // Envia uma mensagem de sucesso ao ftont-end
        //HTTP 201: Created
        res.status(201).end()
    }

    catch(error) {
        //Deu errado: exibe o erro no terminal
        console.error(error)

        //Envia o erro ao front-end com status de erro
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

export default controller
