import prisma from "../database/client.js";

const controller = {} //Objeto vazio

controller.create = async function(req, res) {
    // COnecta-se ao BD e envia uma instrução de criação de um novo documento, contendo os dados que vieram dentro do req.body
    try {
        await prisma.categoria.create({data: req.body})
        //Enviauma mensagem de sucesso ao front-end
        //HTTP 201: Created
        res.status(201).end()

    }catch(error){
        // Deu errado: exibe erro no terminal
        console.error(error)

        //Envia o erro ao front-end, com status de erro
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

export default controller