import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tableBSchema = new Schema(
    {
        MaMau: String,
        TenMau: String,
    },
    {
        collection: "tableB",
    }
);

const tableBModel = mongoose.model("tableB", tableBSchema);
export { tableBModel }