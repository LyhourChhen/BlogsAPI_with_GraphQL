const Subscription = {
    count: {
        subscribe: (parent, args, ctx, info) => {
            const { pubsub } = ctx
            let count = 0
            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count: count,
                })
            }, 1000)
            return pubsub.asyncIterator('count')
        },
    },
    comments: {
        subscribe: (parent, args, { db, pubsub }, info) => {
            const post = db.blogsData.find(
                (post) => post.id === args.postId && post.published,
            )
            if (!post) {
                throw new Error('no post found')
            }
            return pubsub.asyncIterator(`comment ${args.postId}`)
        },
    },
    post: {
        subscribe: (parent, args, ctx, info) => {
            const { db, pubsub } = ctx
            return pubsub.asyncIterator('post')
        },
    },
}

export default Subscription
