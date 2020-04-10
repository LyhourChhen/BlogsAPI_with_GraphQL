import getUserId from '../utils/getUserId'
import colors from 'colors'
const Query = {
    async users(parent, args, { db, prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        }
        if (args.query) {
            opArgs.where = {
                OR: [
                    {
                        name_contains: args.query,
                    },
                    {
                        email_contains: args.query,
                    },
                ],
            }
        }
        const returnData = await prisma.query.users(opArgs, info)
        console.log('render out return data', colors.white(returnData))
        return returnData
    },
    async me(parent, args, { prisma, request }, info) {
        const AuthUserId = await getUserId(request)
        return prisma.query.user(
            {
                where: {
                    id: AuthUserId,
                },
            },
            info,
        )
    },
}

export { Query as default }
