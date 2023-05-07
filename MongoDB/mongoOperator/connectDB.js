import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/PMS");

const Schema = mongoose.Schema;


const bookSchema = new Schema(
    {
        user_id: {
            type: Number,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        collection: "posts",
    }
);

const peopleSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxLength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            maxLength: 20,
        },
        age: {
            type: Number,
            required: true,
        },
        salary: {
            type: Number,
        },
        courseID: {
            type: String,
            ref: 'course'
        }
    },
    {
        collection: "People",
    }
);

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 50,
            unique: true,
        },
        teacher: {
            type: String,
            required: true,
            maxLength: 20,
        },
        lesson: {
            type: [],
        },
        address: {
            type: {},
        }
    },
    {
        collection: "Course",
    }
)

const bookModel = mongoose.model("book", bookSchema);
const peopleModel = mongoose.model("people", peopleSchema);
const courseModel = mongoose.model("course", courseSchema);

// courseModel.create({
//     name: "Hoc lap trinh co ban",
//     teacher: "Nguyen Thi A",
//     lesson: ['lesson 1', 'lesson 2'],
//     address: {
//         province: "Chuong my",
//         city: "Ha Noi"
//     }
// })
//     .then(data => {
//         console.log("Add thanh cong");
//     })
//     .catch(err=> {
//         console.log("Fail ", err);
//     })


peopleModel.find({
    username: "Nguyen Van Sang"
})
    .populate('courseID')
    .then(data=> {
        console.log(data);
    })
    .catch(err=> {
        console.log("fail to find, error: ", err);
    })


// peopleModel.findOneAndDelete({
//     username: 'Nguyen Van Sang',
// })
//     .then(data => {
//         console.log("Delete successfully");
//     })
//     .catch(err => {
//         console.log("fail ", err);
//     })

// peopleModel
//     .create(
//         {
//             username: "Nguyen Van Sang",
//             password: "b19dcpt190",
//             age: 19,
//             salary: 2000,
//         },
//         {
//             username: "Nguyen Thi Linh",
//             password: "b19dcpt140",
//             age: 21,
//             salary: 2000,
//         },
//         {
//             username: "Pham Thi Huong",
//             password: "b19dcpt117",
//             age: 21,
//             salary: 1500,
//         },
//         {
//             username: "Nguyen Hoang Anh",
//             password: "b19dcpt111",
//             age: 20,
//             salary: 1200,
//         },
//         {
//             username: "Vuong Manh Hung",
//             password: "b18dcpt223",
//             age: 22,
//             salary: 1500,
//         }
//     )
//     .then((data) => {
//         console.log("Add successfully");
//     })
//     .catch((err) => {
//         console.log("fail ", err);
//     });

// peopleModel.find({
//     $or: [

//         {age: { $gte: 20 }},
//         {salary: {$gt: 2200}}
//     ]
// })
    // sap xep theo tuy chon
    // .sort({'age':-1})
    // bo qua bao nhieu phan tu truoc do
    // .skip()
    // gioi han so luong ket qua lay ra
    // .limit(1)
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log("Fail to get people");
    // })


// bookModel.find({id: 87})
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('err', err);
//     })

// bookModel.create({
//     user_id: 2,
//     id: 101,
//     title: "dummy title 1",
//     description: "dummy des1"
// })
//     .then(data => {
//         console.log("Thanh cong");
//     })
//     .catch(err => {
//         console.log("fail");
//     })

// bookModel.findOneAndUpdate({
//     id: 101
// }, {
//     title: 'update dummy title 1'
// })
//     .then(data => {
//         console.log("Update thanh cong");
//     })
//     .catch(err => {
//         console.log("Update that bai");
//     })

// bookModel.findOneAndDelete({
//     id: 101
// })
//     .then(data => {
//         console.log("Delete successfully");
//     })
//     .catch(err=> {
//         console.log("Delete fail");
//     })
