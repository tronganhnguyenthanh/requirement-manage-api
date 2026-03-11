import {Request, Response} from "express"
import {prisma} from "../../lib/prisma"
// Add new task
const addNewTask = async (req:Request, res:Response):Promise<void> => {
  try{
    const {taskId, taskName, taskDescription} = req.body 
    await prisma.tasks.create({
     data:{
      taskId:taskId,
      taskName:taskName,
      taskDescription:taskDescription
    } 
    })
    res.status(200).json({message:"Task created"})
  }catch(error:any){
    res.status(400).json({message:error.message})
  }   
}
// Get task list
const getTaskList = async (req:Request, res:Response):Promise<void> => {
  try{
    const taskList = await prisma.employee.findMany({include:{task:true}})
    res.status(200).json({tasks:taskList})
  }catch(error:any){
    res.status(400).json({message:error.message})
  }   
}
export {
 addNewTask, 
 getTaskList
}