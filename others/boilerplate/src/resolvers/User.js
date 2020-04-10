import getUserId from '../utils/getUserId'
const User = {
    email: {
        fragment: 'fragment userId on User {id}',
        resolver: (parent, args, { prisma, request }, info) => {
            const authUserId = getUserId(request, false)
            if (authUserId && authUserId === parent.id) {
                return parent.email
            } else {
                return null
            }
        },
    },
}

export { User as default }
