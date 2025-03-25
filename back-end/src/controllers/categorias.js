import prisma from '../database/client.js'

const controller = {}  //Objeto Vazio

controller.create = async function(req, res){
    /* Conecta-se ao BD e envia uma instalação, de criação de um novo documento, comntendo os dados que vierem dentro da req.body*/
    try{
        await prisma.categoria.create({data: req.body})

        // Envia uma mensagem de sucesso ao front-end
        // HTTP 201: Createf
        res.status(201).end()
    }
    catch(error){
        // Deu errado, exibe o erro no terminal
        console.error(error)

        // Envia o erro ao front-end, com status de erro
        // HTTP 500: Internal Erro
        res.status(500).send(error)
    }
}

export default controller