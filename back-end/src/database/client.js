import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  // Habilita a exibição dos comandos do BD no console
  log: [{
    emit: 'event',
    level: 'query'
  }]
})

prisma.$on('query', event => {
  // Personaliza a forma como a instrução do BD
  // será exibida no console
  console.log('-'.repeat(40))
  console.log(event.query)
  if(event.params) console.log('PARAMS:', event.params)
})

export default prisma