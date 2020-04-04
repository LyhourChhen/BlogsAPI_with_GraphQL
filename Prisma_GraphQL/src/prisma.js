import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// There are some common method to use in this project !
// - prisma.query
// - prisma.mutation
// - prisma.subscription
// - prisma.exist => some utility relate with graphql

// test
prisma.query
    .users(null, '{id name email}')
    .then((data) => console.log('return data', data))
