const Book = require("../models/Book");
const Author = require("../models/Author");

const mongoDataMethods = {
  getAllBooks: async (condition = null) =>
    condition === null ? await Book.find() : await Book.find(condition),
  getAllAuthors: async () => await Author.find(),
  createAuthor: async (args) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
  createBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
  getSingleBook: async (args) => await Book.findById(args),
  getSingleAuthor: async (args) => await Author.findById(args),
};

module.exports = mongoDataMethods;
