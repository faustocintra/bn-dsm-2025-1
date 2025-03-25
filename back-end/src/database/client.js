import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
    log: [{
        emit: 'event',
        level: 'query',
    }],
})

prisma.$on('query', (e) => {
    console.log('-'.repeat(40))
    console.log("Query: ", e.query)
    if (e.params) console.log("Params: ", e.params)
})

export default prisma