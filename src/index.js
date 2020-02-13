require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const resolvers = require("./resolvers");
const typeDefs = require("./schemas/graphql");

const server = new ApolloServer({ typeDefs, resolvers });

async function run() {
  const { url } = await server.listen();

  console.log(`\n\tRunning on ${url}\n`);
}

run();
