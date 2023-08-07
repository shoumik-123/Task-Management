const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");




//Registration

exports.Registration =(req, res)=>{
    let reqBody = req.body;

    UsersModel.create(reqBody)
        .then((result) => {
            res.status(200).json({status: "Success", data: result})
        })
        .catch((err) => {
            res.status(200).json({status: "Fail", data: err})
        })
}


exports.UserLogin =(req,res)=>{
    let reqBody= req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0,Email:1,FirstName:1,LastName:1,Mobile:1,Photo:1}}
    ]
    ).then((data)=>{
        if(data.length > 0){


            let payload =  {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['Email']}
            let token = jwt.sign( payload , 'SecretKey12345');

            res.status(200).json({status:"Success" , token: token ,  data:data})
        }
        else{
            res.status(401).json({Status:"Unauthorized"})
        }
    }).catch((err)=>{
        res.status(400).json({Status : "Fail" , data : err})
    })

}

exports.UpdateProfile = (req, res) => {
    let email = req.headers['email'];
    let reqBody = req.body;

    UsersModel.updateOne({ Email: email }, { $set: reqBody })
        .then((result) => {
            res.status(200).json({ status: "Success", data: result });
        })
        .catch((err) => {
            res.status(400).json({ status: "Fail", data: err });
        });
};