import bscript from 'bcryptjs'
import colors from 'colors'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'
const Mutation = {
    createUser: async (parent, args, { db, prisma }, info) => {
        const password = await hashPassword(args.data.password)
        const emailTaken = await prisma.exists.User({
            email: args.data.email,
        })
        console.log('console out email taken', colors.red(emailTaken))
        if (emailTaken) {
            throw new Error('Email is taken')
        }
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password: password,
            },
        })
        console.log('did i revieve user', user.id)
        return {
            user,
            token: generateToken(user.id),
        }
    },

    login: async (parent, args, { prisma }, info) => {
        const user = await prisma.query.user({
            where: {
                email: args.data.email,
            },
        })
        if (!user) {
            throw new Error('we unable to found your email & username')
        }
        console.log('getting user & password from it', user, user.password)
        const isMatch = await bscript.compare(args.data.password, user.password)
        if (!isMatch) {
            throw new Error('we unable to found your password !')
        }

        return {
            user,
            token: generateToken(user.id),
        }
    },

    async deleteUser(parent, args, { db, prisma, request }, info) {
        const AuthUserId = getUserId(request)
        const existUser = await prisma.exists.User({
            id: args.id,
        })
        if (!existUser) {
            throw new Error('User not found')
        }
        return prisma.mutation.deleteUser(
            {
                where: {
                    id: AuthUserId,
                },
            },
            info,
        )
    },
    updateUser(parent, args, { db, prisma, request }, info) {
        const AuthUserId = getUserId(request)
        if (typeof args.data.password === 'string') {
            args.data.password = hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser(
            {
                where: {
                    id: AuthUserId,
                },
                data: args.data,
            },
            info,
        )
    },
}

export { Mutation as default }
