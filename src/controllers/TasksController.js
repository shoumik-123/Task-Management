const TasksModel = require("../models/TasksModel");



exports.createTask =(req, res)=>{

    let reqBody = req.body;
    let email = req.headers['email'];

    TasksModel.create({...reqBody , Email:email})
        .then((result) => {
            res.status(200).json({status: "Success", data: result})
        })
        .catch((err) => {
            res.status(400).json({status: "Fail", data: err})
        })
}


exports.deleteTask =(req,res)=>{
    let id = req.params.id;
    let Query = {_id:id}

    TasksModel.deleteOne(Query)
        .then((data)=>{
            res.status(200).json({status: "Deleted", data: data})
        })
        .catch((err)=>{
            res.status(400).json({status: "Fail", data: err})
        });
}


exports.updateTaskStatus = (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let Query = { _id: id }
    let reqBody = { Status: status }

    TasksModel.updateOne(Query, reqBody)
        .then((result,err) => {
            console.log(result.acknowledged)
            console.log(err)
            if (result.acknowledged) {
                res.status(200).json({ status: "Success", data: result });
            } else {
                res.status(400).json({ status: "Fail", message: "Operation not acknowledged" });
            }
        })
        .catch((err) => {
            res.status(400).json({ status: "Fail", data: err });
        });

    // console.log(reqBody , Query)
    //
    // TasksModel.findOneAndUpdate(Query, {...reqBody}, { new: true }).exec()
    //     .then(updatedUser => console.log(updatedUser))
    //     .catch(err => console.log(err));
}

exports.listTaskByStatus =(req,res)=>{
    let status = req.params.status;
    let email = req.headers['email']

    TasksModel.aggregate([
        {$match:{Status:status , Email :email}},
        {$project:{
            // _id:1,
                Title:1,Description:1,Status:1,
                CreateDate:{
                $dateToString:{
                    date:"$CreateDate",
                    format:"%d-%m-%y"
                }
            }
        }}
    ]).then((data)=>{
    res.status(200).json({status: "Success", data: data})
    })
    .catch((err)=>{
        res.status(400).json({status: "Failll", data: err})
    });
}


exports.taskStatusByCount = (req, res)=>{
    let email = req.headers['email']

    TasksModel.aggregate([
        {$match:{Email :email}},
        {$group:{_id:"$Status", sum:{$count:{}}}}
    ]).then((data)=>{
    res.status(200).json({status: "Success", data: data})
    })
    .catch((err)=>{
        res.status(400).json({status: "Fail", data: err})
    });
}



