import prisma from '../database/client.js'

const controller = {} //Objeto vazio



controller.create = async function(req, res) {
    /* Conecta-se ao BD e envia uma instrução de criação de um novo documento,
    contendo os dados que vieram dentro de req.body
    */
   try{
    await prisma.categoria.create({ data: req.body })

    // Envia uma mensagem de sucesso ao front-end
    // HYYP 201: Created
    res.status(201).end()
   }
   catch(error) {
    // Deu errado: exibe o erro no terminal
    console.error(error)

    res.status(500).send(error)
   }
}

export default controller