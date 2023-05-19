import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import connect from "./db.js";

import { movieModel } from "./models/movie.js";
import { userModel } from "./models/user.js";
import { postModel } from "./models/post.js";
import { commentModel } from "./models/comment.js";
// import { commentModel } from "./models/user.js";
// import { movieModel } from "./models/movie.js";

dotenv.config();

const app = express();

connect();

const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/addNewMovie", async (req, res) => {
    try {
        const data = new movieModel(req.body);
        data.save();
        res.status(200).json("Insert thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});
app.post("/addNewUser", async (req, res) => {
    try {
        const data = new userModel(req.body);
        data.save();
        res.status(200).json("Them moi thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});
app.post("/addNewComment", async (req, res) => {
    try {
        const data = new commentModel(req.body);
        data.save();
        res.status(200).json("Insert comment thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});
app.post("/addNewComment", async (req, res) => {
    try {
        const data = new postModel(req.body);
        data.save();
        res.status(200).json("Insert post thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
get all documents
*/
app.get("/getAllDocs", async (req, res) => {
    try {
        const output = await movieModel.find();
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
get all documents with writer set to "Quentin Tarantino"
*/
app.get("/getAllDocs_SetWriter", async (req, res) => {
    try {
        const output = await movieModel.find(
            { writer: "Quentin Tarantino" },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
get all documents where actors include "Brad Pitt"
*/
app.get("/getAllDocs_actors", async (req, res) => {
    try {
        const output = await movieModel.find({ actors: "Brad Pitt" }, { _id: 0 });
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
get all documents with franchise set to "The Hobbit"
*/
app.get("/getAllDocs_franchise", async (req, res) => {
    try {
        const output = await movieModel.find(
            { franchise: "The Hobbit" },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
get all movies released in the 90s
*/
app.get("/getAllDocs_90s", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                $and: [{ year: { $gte: 1990 } }, { year: { $lt: 2000 } }],
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
get all movies released before the year 2000 or after 2010
*/
app.get("/getAllDocs_released", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                $or: [{ year: { $lt: 2000 } }, { year: { $gt: 2010 } }],
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
*/

app.get("/updateDocs_q1", async (req, res) => {
    const fieldName = "The Hobbit: An Unexpected Journey";
    try {
        const output = await movieModel.findOneAndUpdate(
            {
                title: "The Hobbit: An Unexpected Journey",
            },
            {
                $set: {
                    synopsis:
                        "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.",
                },
            }
        );
        res.status(200).json("Update thanh cong!");
    } catch (error) {
        console.log("Error: ", error);
    }
});
app.get("/updateDocs_q2", async (req, res) => {
    try {
        const output = await movieModel.findOneAndUpdate(
            {
                title: "The Hobbit: The Desolation of Smaug",
            },
            {
                $set: {
                    synopsis:
                        "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.",
                },
            }
        );
        res.status(200).json("Update thanh cong!");
    } catch (error) {
        console.log("Error: ", error);
    }
});
app.get("/updateDocs_q3", async (req, res) => {
    try {
        const output = await movieModel.findOneAndUpdate(
            {
                title: "Pulp Fiction",
            },
            {
                $addToSet: {
                    actors: "Samuel L. Jackson",
                },
            }
        );
        res.status(200).json("Update thanh cong!");
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
find all movies that have a synopsis that contains the word "Bilbo"
*/
app.get("/findText/q1", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                synopsis: {
                    $regex: "bilbo",
                    $options: "$i",
                },
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
        return;
    }
});
/* 
find all movies that have a synopsis that contains the word "Gandalf"
*/
app.get("/findText/q2", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                synopsis: {
                    $regex: "Gandalf",
                    $options: "$i",
                },
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
*/
app.get("/findText/q3", async (req, res) => {
    try {
        const output = await movieModel.find(
            {


                synopsis: {
                    $regex: "Bilbo",
                },
                synopsis: {
                    $not: {
                        $regex: "Gandalf",
                    }
                }


            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
*/
app.get("/findText/q4", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                $or: [

                    {
                        synopsis: {
                            $regex: "dwarves",
                        }
                    },
                    {
                        synopsis: {
                            $regex: "hobbit",
                        }
                    }
                ]
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all movies that have a synopsis that contains the word "gold" and "dragon"
*/
app.get("/findText/q5", async (req, res) => {
    try {
        const output = await movieModel.find(
            {
                $and: [

                    {
                        synopsis: {
                            $regex: "gold",
                        }
                    },
                    {
                        synopsis: {
                            $regex: "dragon",
                        }
                    }
                ]
            },
            { _id: 0 }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output,
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
delete the movie "Pee Wee Herman's Big Adventure"
*/
app.get("/delete/q1", async (req, res) => {
    try {
        const output = await movieModel.findOneAndDelete(
            {
                title: "Pee Wee Herman's Big Adventure"
            }
        );
        res.status(200).json("Xoa thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
delete the movie "Avatar"
*/
app.get("/delete/q2", async (req, res) => {
    try {
        const output = await movieModel.findOneAndDelete(
            {
                title: "Avatar"
            }
        );
        res.status(200).json("Xoa thanh cong");
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
find all users
*/
app.get("/related/q1", async (req, res) => {
    try {
        const output = await userModel.find();
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all posts
*/
app.get("/related/q2", async (req, res) => {
    try {
        const output = await postModel.find();
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
find all posts that was authored by "GoodGuyGreg"
*/
app.get("/related/q3", async (req, res) => {
    try {
        const output = await postModel.find(
            {
                username: "GoodGuyGreg"
            }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all posts that was authored by "ScumbagSteve"
*/
app.get("/related/q4", async (req, res) => {
    try {
        const output = await postModel.find(
            {
                username: "ScumbagSteve"
            }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
find all comments
*/
app.get("/related/q5", async (req, res) => {
    try {
        const output = await commentModel.find(
            {
                // username: "ScumbagSteve"
            }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});

/* 
find all comments that was authored by "GoodGuyGreg"
*/
app.get("/related/q6", async (req, res) => {
    try {
        const output = await commentModel.find(
            {
                username: "GoodGuyGreg"
            }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all comments that was authored by "ScumbagSteve"
*/
app.get("/related/q7", async (req, res) => {
    try {
        const output = await commentModel.find(
            {
                username: "ScumbagSteve"
            }
        );
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
/* 
find all comments belonging to the post "Reports a bug in your code"
*/
app.get("/related/q8", async (req, res) => {
    try {
        const output = await commentModel.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: 'post',
                    foreignField: "_id",
                    as: "post",
                    pipeline: [
                        {
                            $project: {
                                _id: 0
                            }
                        },
                        {
                            $match: {
                                title: "Reports a bug in your code"
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$post"
            }
        ])
        res.status(200).json({
            NumberOfResult: output.length,
            output
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});


app.get("/", (req, res) => {
    res.json("nguyen van sang");
});
app.listen(port, () => {
    console.log(`> Run on port http://localhost:${port}`);
});
