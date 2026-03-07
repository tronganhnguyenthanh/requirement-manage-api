import express from "express"
import {addNewEmployee, deleteEmployee, getEmployees, updateEmployee} from "../../controllers/employees/employee.controller"
const employee_router_api = express.Router()
employee_router_api.post("/new/employee", addNewEmployee)
employee_router_api.get("/employee/list", getEmployees)
employee_router_api.put("/employee/update/:id", updateEmployee)
employee_router_api.post("/employee/delete", deleteEmployee)
export default employee_router_api