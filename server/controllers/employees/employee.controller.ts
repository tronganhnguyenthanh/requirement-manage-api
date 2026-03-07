import {Request, Response} from "express";
import {prisma} from "../../lib/prisma";
// Create employee
const addNewEmployee = async (req:Request, res:Response):Promise<void> => {
  try{
    const {firstName, lastName} = req.body
    await prisma.employee.create({data:{firstName:firstName,lastName:lastName}})
    res.status(201).json({message:"Employee created"})
  }catch(error:any){
    res.status(400).json({message:error.message})
 }
}
// Get employee list
const getEmployees = async (req:Request, res:Response):Promise<void> => {
   try{
    const employeeList = await prisma.employee.findMany()
    res.json({employees:employeeList})
  }catch(error:any){
    res.status(400).json({message:error.message})
 }
}
// Update employee
const updateEmployee = async (req:Request, res:Response):Promise<void> => {
   try{
    const id = Number(req.params.id)
    const {firstName, lastName} = req.body
    await prisma.employee.update({where:{id:id},data:{firstName:firstName, lastName:lastName}})
    res.status(200).json({message:"Employee updated"})
  }catch(error:any){
    res.status(400).json({message:error.message})
 }
}
// Delete employee
const deleteEmployee = async (req:Request, res:Response):Promise<void> => {
   try{
    const id = Number(req.body.id)
    await prisma.employee.delete({where:{id:id}})
    res.status(200).json({message:"Employee deleted"})
  }catch(error:any){
    res.status(400).json({message:error.message})
 }
}
export {
 addNewEmployee, 
 getEmployees,
 updateEmployee,
 deleteEmployee
}