import prisma from "../database/client.js"
const controller = {}

controller.create = async function(req,res){
    /*conecta se ao bd e envia uma instrução de criação de um novo documento ,contendo os dados que vieram do req.body*/
    try {
      await prisma.categoria.create({data:req.body})
            res.status(201).end()

        
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}
export default controller
