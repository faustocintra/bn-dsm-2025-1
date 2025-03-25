import {PrismaClient} from '@prisma/client'

const prima = new PrismaClient({
    //Habilita a exibicao dos comandos do BD no console
    log: [{
        emit: 'event',
        level:'query'
    }]
})

prisma.$on('query', event => {
    //Personaliza a forma como a instalacao do BDsera exibida no console
    console.log('-'.repeat(40))
    console.log(event.query)
    if(event.params) console.log('PARAMS', event.params)
})

export default prima
