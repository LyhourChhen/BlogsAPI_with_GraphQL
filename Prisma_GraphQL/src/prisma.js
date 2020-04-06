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

prisma.query
    .posts(null, '{id title body published author{id name}}')
    .then((data) => console.log('data', data))

// mutation
// prisma.mutation
//     .createPost(
//         {
//             data: {
//                 title: 'Need to fill inside here',
//                 body: 'test => add more',
//                 published: false,
//                 author: {
//                     connect: {
//                         id: 'ck8l5p9ii006i07044xqxxhmv',
//                     },
//                 },
//             },
//         },
//         '{id title body published}',
//     )
//     .then((post) => {
//         console.log('data', post)
//         return prisma.query.users(null, '{id name  posts {id title}}')
//     })
//     .then((data) => {
//         console.log(JSON.stringify(data, null, 2))
//     })

prisma.mutation
    .updatePost(
        {
            where: {
                id: 'ck8nw4hs9001b07044t8pop1r',
            },
            data: {
                title: 'fuck you bitch',
                body: "hahah bitch you've beeen lie",
                published: true,
            },
        },
        '{id}',
    )
    .then((data) => {
        return prisma.query.posts(null, '{id title body}')
    })
    .then((data) => console.log(data))
