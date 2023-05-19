
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        username: String,
        comment: String,
        post: {
            type: Schema.Types.ObjectId,
            ref: "post"
        }
    },
    {
        collection: 'comments'
    }
)

const commentModel = mongoose.model('comment', commentSchema)
export { commentModel }