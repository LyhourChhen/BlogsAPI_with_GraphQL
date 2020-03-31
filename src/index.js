import { GraphQLServer } from 'graphql-yoga'
import uuid from 'uuid'

// Type Definition || Schema (This is where our structure should look like)
// ! => It ok not to be return && if noting it will return null

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String
    }
`

// Resolvers => The function where where schema need to be performs

const resolvers = {
    //This must be match with type
    Query: {
        hello: () => 'This is my First GraphQL Query',
        name: () => 'LyhourChhen',
        location: () => 'I love in PhnomPenh, City of 🇰🇭',
        bio: () =>
            'My name is LyhourChhen and i am also the software engineer who currently working with Frontend-Developments',
    },
}

// With Scala Type => Boolean, String, ID, Int and Float

const typeDefs_with_scalaType = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employment: Boolean!
        salary: Float
    }
`
const resolvers_with_scalaType = {
    Query: {
        id: () => uuid(),
        name: () => 'LyhourChhen',
        age: () => 19,
        employment: () => true,
        salary: () => 333.33,
    },
}

// -------------------------------
const server = new GraphQLServer({
    typeDefs: [typeDefs_with_scalaType],
    resolvers: [resolvers_with_scalaType],
})

server.start(() => {
    console.log('Server is up !')
})
