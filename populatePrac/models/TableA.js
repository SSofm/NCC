import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tableASchema = new Schema(
    {
        MaSanPham: String,
        TenSanPham: String,
        Mau: [
            {
                type: String,
                ref: "tableB"
            }
        ]
    },
    {
        collection: "TableA",
    }
);

const tableAModel = mongoose.model("tableA", tableASchema);
export { tableAModel }