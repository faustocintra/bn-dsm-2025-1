import prisma from '../database/client.js'

const controller = {} //Objeto Vazio

controller.create = async function(req,res) {
    /* Conecta-se ao BD e envia uma instrução de criação
     de um novo documento, contendo os dados que vieram 
     dentro de req.body
    */
   try {
        await prisma.categoria.create({data: req.body})
        //Envia uma mensagem de sucesso ao front-end
        // HTTP 201: CREATED
        res.status(201).end()
   }
   catch(error){
     //Deu errado exibi um erro no terminal
     console.error(error);
     //Envia o erro ao front-end, com status de erro
     // HTTP 500: Interal Server Error
     res.status(500).send(error);
   }
}
export default controller