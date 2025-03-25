import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    // Habilita a exibiçao dos comandos do BD no console
    log: [{
        emit: 'event',
        level: 'query'
    }]
})

prisma.$on('query', event => {
    // Personaliza a forma como a instrucao do BD
    // Sera exibida no console
    console.log('-'.repeat(40))
    console.log(event.query)
    if(event.params) console.log('PARAMS:', event.params)

})

export default prisma