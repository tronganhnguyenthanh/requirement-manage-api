import {Button, Card, Form, Input, Select} from "antd"
import axios from "axios"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const FormTask = () => {
  const {Option} = Select
  const {TextArea} = Input
  const [taskIdList, setTaskIdList] = useState([])
  const [taskId, setTaskId] = useState("")
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const navigate = useNavigate()
  const handleOnChange = (value) => {
   setTaskId(value)
  }
  useEffect(() => {
   getTasks() 
  },[])
  const getTasks = async () => {
   const res = await axios.get("http://localhost:2204/api/employee/list")
   setTaskIdList(res?.data?.employees)
  }
  const addNewTask = async () => {
   if(taskId === ""){
    toast.error("Please choose your taskId",{position:"top-center"})
    return
   }
   if(taskName === ""){
    toast.error("Please enter your task name",{position:"top-center"})
    return
   }
   if(taskDescription === ""){
    toast.error("Please enter your task description",{position:"top-center"})
    return 
   }else{
     const res = await axios.post("http://localhost:2204/api/v1/new/task",{
      taskId:taskId,
      taskName:taskName,
      taskDescription:taskDescription
     })
     toast.success(res?.data?.message, {position:"top-center"})
     setTimeout(() => {
      navigate("/task/list")
     },1000)
   }
  } 
  return (
   <Card style={{maxWidth:600, margin:"auto", marginTop:"150px"}}>
     <ToastContainer/>    
     <Form labelCol={{span:8}} wrapperCol={{span:16}} style={{maxWidth:700, margin:"auto"}}>
       <Form.Item label="TaskId">
         <Select onChange={handleOnChange}>
          {taskIdList?.length > 0 && taskIdList?.map((option, index) => {
            return(
             <Option key={index} value={option?.id}>{`TSK${option?.id}`}</Option>
            )
           })
          }
         </Select>
       </Form.Item> 
       <Form.Item label="Taskname">
         <Input
           onChange={(e) => setTaskName(e.target.value)}
         />
       </Form.Item>
       <Form.Item label="Taskdescription">
         <TextArea 
           rows={5}
           onChange={(e) => setTaskDescription(e.target.value)}
         />
       </Form.Item>
       <Form.Item label={null}>
         <Button color="cyan" variant="solid" onClick={addNewTask}>
           Add new task
         </Button>
       </Form.Item>
     </Form>  
   </Card>
  )
}
export default FormTask