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

// ==> QUERY BINDING

// prisma.query
//     .users(null, '{id name email}')
//     .then((data) => console.log('return data', data))

// prisma.query.comments(null, '{id text author {id name}}').then((comments) => {
//     console.log(JSON.stringify(comments, null, 2))
// })

// prisma.query
//     .posts(null, '{id title body published author{id name}}')
//     .then((data) => console.log('data', data))

// ==> BINDING MUTATION
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

// prisma.mutation
//     .updatePost(
//         {
//             where: {
//                 id: 'ck8nw4hs9001b07044t8pop1r',
//             },
//             data: {
//                 title: 'fuck you bitch',
//                 body: "hahah bitch you've beeen lie",
//                 published: true,
//             },
//         },
//         '{id}',
//     )
//     .then((data) => {
//         return prisma.query.posts(null, '{id title body}')
//     })
//     .then((data) => console.log(data))

//  ==> Binding using Async & Await
// Create new post using function (async & await)
const createPostForUser = async (authorId, data) => {
    // create post
    const post = await prisma.mutation.createPost(
        {
            data: {
                ...data,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
            },
        },
        '{id}',
    )
    // get user
    const user = await prisma.query.user(
        {
            where: {
                id: authorId,
            },
        },
        '{id name email posts {id title published}}',
    )

    return user
}

// createPostForUser('ck8l5p9ii006i07044xqxxhmv', {
//     title: 'These books that you should be read in your life',
//     body: 'The art of war',
//     published: true,
// }).then((user) => console.log(JSON.stringify(user, null, 2)))

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost(
        {
            where: {
                id: postId,
            },
            data: {
                ...data,
            },
        },
        '{author {id}}',
    )
    const user = await prisma.query.user(
        {
            where: {
                id: post.author.id,
            },
        },
        '{id name email posts {id title published}}',
    )
    return user
}

updatePostForUser('ck8lgen6700vw0704hrpq54z0', {
    published: false,
}).then((user) => console.log(JSON.stringify(user, null, 2)))
