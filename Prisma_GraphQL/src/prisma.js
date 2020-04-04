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

// ==> test

// prisma.query
//     .users(null, '{id name email}')
//     .then((data) => console.log('return data', data))

// prisma.query.comments(null, '{id text author {id name}}').then((comments) => {
//     console.log(JSON.stringify(comments, null, 2))
// })

// mutation
prisma.mutation
    .createPost(
        {
            data: {
                title: 'create post via prisma binding',
                body: 'This is how i am binding via prisma',
                published: true,
                author: {
                    connect: {
                        id: 'ck8l5p9ii006i07044xqxxhmv',
                    },
                },
            },
        },
        '{id title body published}',
    )
    .then((post) => {
        console.log(JSON.stringify(post, null, 2))
    })
