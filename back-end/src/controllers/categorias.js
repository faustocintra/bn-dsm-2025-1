import prisma from "../database/client.js";

const controller = {} // objeto vazio

controller.create = async function(req, res) {
    /* CONECTA/se ao BD e envia uma instrucao de criacao
       de um novo documento. contendo os dados que vieram
       dento de req.body
    */
    try {
    await prisma.categoria.create({data: req.boy})
        // Envia uma mensagem de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        //Deu errado: exibe o erro no terminal
        console.error(error)

        // Envia o erro ao front-end, com status de erro
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}
export default controller