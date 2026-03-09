import {Button, Card, Form, Input} from "antd"
import {useState} from "react"
import {toast, ToastContainer} from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const FormEmployee = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()
  const handleAddNewEmployee = async () => {
   if(firstName === ""){
    toast.error("Please enter your firstname", {position:"top-center"})
    return
   }
   if(lastName === ""){
    toast.error("Please enter your lastname", {position:"top-center"})
    return
   }else{
     const addNewEmployee = await axios.post("http://localhost:2204/api/new/employee",{firstName:firstName,lastName:lastName})
     toast.success(addNewEmployee?.data?.message,{position:"top-center"})
     setTimeout(() => {
      navigate("/employee/list")
     },1000)
   }
  }
  return (
   <Card style={{maxWidth:600, margin:"auto", marginTop:"190px"}}>
     <ToastContainer/>
     <Form labelCol={{span:8}} wrapperCol={{span:16}} style={{maxWidth:700, margin:"auto"}}>
       <Form.Item label="Firstname">
         <Input onChange={(e) => setFirstName(e.target.value)}/>
       </Form.Item>
       <Form.Item label="Lastname">
         <Input onChange={(e) => setLastName(e.target.value)}/>
       </Form.Item>
       <Form.Item label={null}>
         <Button type="primary" onClick={handleAddNewEmployee}>Add new employee</Button>
       </Form.Item>
     </Form>
   </Card>
  )
}
export default FormEmployee