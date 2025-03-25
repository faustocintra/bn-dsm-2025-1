import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    // Permite exibir comandos no terminal
    log:[{
        emit: 'event',
        level:'query'
    }]
})

prisma.$on('query', event =>{
    // Personaliza como vai aparecer no terminal
    console.log('-'.repeat(40))
    console.log(event.query)
    if(event.params) console.log('PARAMS:', event.params)
})

export default prisma