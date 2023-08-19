const express = require('express');
const UsersController = require("../controllers/UsersController")
const TasksController = require("../controllers/TasksController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")
const router = express.Router();



router.post("/registration" , UsersController.Registration);
router.post("/login",UsersController.UserLogin)
router.post("/profileUpdate",AuthVerifyMiddleware ,UsersController.UpdateProfile)
router.get("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails)





router.post("/createTask",AuthVerifyMiddleware ,TasksController.createTask)
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware ,TasksController.updateTaskStatus)
router.post("/deleteTask/:id",AuthVerifyMiddleware ,TasksController.deleteTask)
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware ,TasksController.listTaskByStatus)
router.get("/taskStatusByCount",AuthVerifyMiddleware ,TasksController.taskStatusByCount)





//Recovery password

router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail)


module.exports =router;