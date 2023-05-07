const { books, authors } = require("../data/static");
const Author = require("../models/Author");
const Book = require("../models/Book");
const resolvers = {
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: (parent, { id }, { mongoDataMethods }) =>
      mongoDataMethods.getSingleBook(id),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: (parent, { id }, { mongoDataMethods }) =>
      mongoDataMethods.getSingleAuthor(id),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getSingleAuthor(authorId),
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  // Mutation
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
  },
};
module.exports = resolvers;
