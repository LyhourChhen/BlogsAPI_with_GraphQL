const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub, prisma }, info) {
            // const post = db.posts.find(
            //     (post) => post.id === postId && post.published,
            // )
            // if (!post) {
            //     throw new Error('Post not found')
            // }
            // return pubsub.asyncIterator(`comment ${postId}`)

            return prisma.subscription.comment(
                {
                    where: {
                        node: {
                            post: {
                                id: postId,
                            },
                        },
                    },
                },
                info,
            )
        },
    },
    post: {
        subscribe(parent, args, { pubsub, prisma }, info) {
            // return pubsub.asyncIterator('post')
            return prisma.subscription.post(
                {
                    where: {
                        node: {
                            published: true,
                        },
                    },
                },
                info,
            )
        },
    },
}

export { Subscription as default }
