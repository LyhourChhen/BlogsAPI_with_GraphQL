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
}

export default Subscription
