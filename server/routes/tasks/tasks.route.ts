import express from "express"
import {addNewTask, getTaskList} from "../../controllers/tasks/tasks.controller"
const task_router_api = express.Router()
task_router_api.post("/new/task", addNewTask)
task_router_api.get("/task/list", getTaskList)
export default task_router_api