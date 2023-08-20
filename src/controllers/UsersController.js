const UsersModel = require("../models/UsersModel");
const OTPModel = require("../models/OTPModel");
const jwt = require("jsonwebtoken");
const SendEmailUtility = require("../utility/SendEmailUtility");




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


exports.ProfileDetails = (req , res)=>{
    let email = req.headers['email'];

    UsersModel.aggregate([
        {$match:
                {
                    Email:email
                }
        },
        {$project:
                {
                    _id:1,
                    Email:1,
                    FirstName:1,
                    LastName:1,
                    Mobile:1,
                    Password:1,
                    Photo:1
                }
        }

    ]).then((result)=>{
        res.status(200).json({status: "Success", data: result})
    }).catch((err)=>{
        res.status(400).json({status: "Fail", data: err})

    })
}


//For reset password
exports.RecoverVerifyEmail= async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() *  900000)

    try{
        //Email query
        let UserCount = (await UsersModel.aggregate([
            {$match:{
                Email:email
            }},
            {
                $count:"total"
            }
        ]))
        if(UserCount[0].total > 0){

            //OTP insert
            let CreateOTP = await OTPModel.create({Email:email , Otp : OTPCode})

            //Send email
            let SendEmail = await SendEmailUtility(email , "Your PIN code is =  " + OTPCode , "Task Manager PIN verification.")

            res.status(200).json({status:"Success" , data: SendEmail})
        }
        else {
            res.status(201).json({status:"Fail" , data: "No User Found."})
        }
    }
    catch (err) {
        res.status(400).json({status:"Fail" , data: err})
    }
}