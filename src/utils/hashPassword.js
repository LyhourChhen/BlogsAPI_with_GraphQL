import bscript from 'bcryptjs'

const hashPassword = (password) => {
    if (password.length < 8) {
        throw new Error('Password must be 8 character longer')
    }
    const password = bscript.hash(args.data.password, 10)
    return password
}
export default hashPassword
