import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import connect from "./db.js";

import { tableAModel } from "./models/TableA.js";
import { tableBModel } from "./models/TableB.js";



// init app & middleware
const app = express();
connect();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/addNewItemA', async(req, res) => {
    try {
        const data = new tableAModel(req.body)
        data.save();
        res.status(200).json("Save thanh cong")

    } catch (error) {
        console.log("error: ", error);
    }
})
app.post('/addNewItemB', async(req, res) => {
    try {
        const data = new tableBModel(req.body)
        data.save();
        res.status(200).json("Save thanh cong")

    } catch (error) {
        console.log("error: ", error);
    }
})


app.get('/populate/matchColor', async (req, res) => {
    try {
        const output = await tableAModel.aggregate([
            {
                $lookup: {
                    from: "TableB",
                    localField: "Mau",
                    foreignField: "MaMau",
                    as: "Table_C"
                }
            },
            {
                $project: {
                    _id: 0,
                    MaSanPham: "$MaSanPham",
                    TenSanPham: "$TenSanPham",
                    Mau: "$Table_C.TenMau"
                }
            }
        ])
        
        res.status(200).json({
            results: output.length,
            output
        })
    } catch (error) {
        console.log("Error: ", error);
    }
})

// app.get('/toUpper', async(req, res) => {
//   try {
//     const output = await playerModel.aggregate([
//       {
//         $project: {
//           firstName: {$toLower: "$firstName"},
//           lastName: {$toLower: "$lastName"}
//         } 
//       }
//     ])
//     res.status(200).json({
//       NumberOfResult: output.length,
//       output
//     })
//   } catch (error) {
//     console.log("Error: ", error)
//   }
// })
app.listen(port, () => {
  console.log(`> Run on port http://localhost:${port}`);
});
