const { join: joinPath } = require("path");
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");

const typesArray = fileLoader(joinPath(__dirname, "./*.graphql"));
const typesMerged = mergeTypes(typesArray);

module.exports = typesMerged;
