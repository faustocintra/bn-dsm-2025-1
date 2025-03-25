import prisma from "../database/client.js";

const controller= {} //obj vazio

controller.create = async function(req, res){
    // conecta ao db e envia uma instrução de criação de um novo documento, contendoos dados que vierem de req.body
    try {
        await prisma.categoria.create({data: req.body})
        res.status(201).end() //mensagem de sucesso
    }
    catch(error){
        console.error(error) //mostra o erro no terminal
        
        //enviar erro pro front
        res.status(500).send(error)
    }
}

export default controller