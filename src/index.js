import { GraphQLServer } from "graphql-yoga";

// Type Definition || Schema (This is where our structure should look like)
// ! => always be return && if noting it will return null
const typeDefs = `
    type Query {
        hello: String!
    }
`;

// Resolvers => The function where where schema need to be performs
const resolvers = {
  //This must be match with type
  Query: {
    hello: () => "This is my First GraphQL Query"
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Server is up !");
});
