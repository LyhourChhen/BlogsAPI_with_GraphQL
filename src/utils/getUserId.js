import jwt from 'jsonwebtoken'
const getUserId = (request, requireAuth = true) => {
    const header = request.request
        ? request.request.headers.authorization // use for Typical mutation and query
        : request.connection.context.Authorization // use for WebSocket

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisasecret')
        return decoded.userId
    }
    if (requireAuth) {
        throw new Error('Authentication required')
    }
    return null
}

export default getUserId
