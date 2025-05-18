<<<<<<< HEAD
import {PrismaClient} from '@prisma/client'
=======
import { PrismaClient } from '@prisma/client'
>>>>>>> origin/main

const prisma = new PrismaClient({
  // Habilita a exibição dos comandos do BD no console
  log: [{
    emit: 'event',
<<<<<<< HEAD
    level:'query'
=======
    level: 'query'
>>>>>>> origin/main
  }]
})

prisma.$on('query', event => {
<<<<<<< HEAD
  // Personalizar a forma como a instrução do BD será exibida no console
  console.log('-'.repeat(40))
  console.log(event.query)
  if(event.params) console.log('PARAMS:', event.params)

=======
  // Personaliza a forma como a instrução do BD
  // será exibida no console
  console.log('-'.repeat(40))
  console.log(event.query)
  if(event.params) console.log('PARAMS:', event.params)
>>>>>>> origin/main
})

export default prisma