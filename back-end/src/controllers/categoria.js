import prisma from "../database/client.js";

const controller = {} // Objeto vazio

controller.create = async function (req, res) {
    //conecta ao bd e envia uma instrução de criação de um novo documento contendo os dados que vieram dentro de um req.body
     try {
        await prisma.categoria.create({ data: req.body })
        //envia uma mensagem para o front end
        //http 201: created
        
        res.status(201).end()
    }
    catch(error){
        //deu errado: exibe o erro no terminal
        console.error(error)
        //envia o erro ao front end, com status de erro 
        // http 500: internal server error
        res.status(500).send(error)

    }
}

export default controller