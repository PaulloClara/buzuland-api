const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books() {
      return [{ title: "My First Book" }];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function run() {
  const { url } = await server.listen();

  console.log(`\n\tRunning on ${url}\n`);
}

run();
