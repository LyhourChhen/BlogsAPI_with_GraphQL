import { GraphQLServer } from "graphql-yoga";

// Type Definition || Schema (This is where our structure should look like)
// ! => always be return && if noting it will return null
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String
    }
`;

// Resolvers => The function where where schema need to be performs
const resolvers = {
  //This must be match with type
  Query: {
    hello: () => "This is my First GraphQL Query",
    name: () => "LyhourChhen",
    location: () => "I love in PhnomPenh, City of 🇰🇭",
    bio: () =>
      "My name is LyhourChhen and i am also the software engineer who currently working with Frontend-Developments"
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Server is up !");
});
