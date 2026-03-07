import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import employee_router_api from "./routes/employees/employees.route"
import task_router_api from "./routes/tasks/tasks.route"
dotenv.config()
const app = express()
const port = process.env.PORT 
app.listen(port, () => {
 console.log(`Server is running on port ${port}`)   
})
app.use(express.json())
app.use(cors())
app.use("/api", employee_router_api)
app.use("/api/v1", task_router_api)