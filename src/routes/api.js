const express = require('express');
const UsersController = require("../controllers/UsersController")
const TasksController = require("../controllers/TasksController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")
const router = express.Router();



router.post("/registration" , UsersController.Registration);
router.post("/login",UsersController.UserLogin)
router.post("/profileUpdate",AuthVerifyMiddleware ,UsersController.UpdateProfile)




router.post("/createTask",AuthVerifyMiddleware ,TasksController.createTask)
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware ,TasksController.updateTaskStatus)
router.post("/deleteTask/:id",AuthVerifyMiddleware ,TasksController.deleteTask)
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware ,TasksController.listTaskByStatus)
router.get("/taskStatusByCount",AuthVerifyMiddleware ,TasksController.taskStatusByCount)


module.exports =router;