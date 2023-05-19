import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        title: String,
        writer: String,
        year: Number,
        actors: [],
        franchise: String,
        synopsis: String

    },
    {
        collection: 'movies'
    }
)

const movieModel = mongoose.model('movie', movieSchema)
export {movieModel}