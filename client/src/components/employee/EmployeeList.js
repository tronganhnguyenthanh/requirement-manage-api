import {Form, Popconfirm, Space, Table, Typography} from "antd"
import {ArrowLeftOutlined} from "@ant-design/icons"
import axios from "axios"
import {useEffect, useState} from "react"
import EditEmployeeCell from "./EditEmployeeCell"
import {Link} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([])
  const [editingKey, setEditingKey] = useState("")
  const [form] = Form.useForm()
  const isEditing = (record) => record.id === editingKey
  useEffect(() => {
   getEmployeeList()
  },[])
  const getEmployeeList = async () => {
   const res = await axios.get("http://localhost:2204/api/employee/list")
   setEmployeeList(res?.data?.employees)
  }
  const edit = (record) => {
   form.setFieldsValue({firstName:"", lastName:"", ...record})
   setEditingKey(record.id);
  }
  const cancel = () => {
   setEditingKey("")
  }
  const save = async (id) => {
    try{
      const row = await form.validateFields();
      const newEmp = [...employeeList];
      const index = newEmp.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newEmp[index];
        newEmp.splice(index, 1,{
         ...item,
         ...row,
        })
        setEmployeeList(newEmp);
        setEditingKey("")
      }else{
        newEmp.push(row)
        setEmployeeList(newEmp)
        setEditingKey("")
      }
      const updateEmployee = await axios.put(`http://localhost:2204/api/employee/update/${id}`,row)
      toast.success(updateEmployee?.data?.message, {position:"top-center"})
    }catch(errInfo){
      toast.error(errInfo, {position:"top-center"});
    }
  }
  const columns = [
    {
      title:"Id",
      dataIndex:"id",
      align:"center",
      sorter:(a, b) => a.id - b.id
    },
    {
      title:"Lastname",
      dataIndex:"lastName",
      align:"center",
      editable:true
    },
    {
      title:"Firstname",
      dataIndex:"firstName",
      align:"center",
      editable:true
    },
    {
      title:"Action",
      align:"center",
      render:(_,record) => {
       const editable = isEditing(record);
       return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.id)} style={{marginInlineEnd:8}}>Save</Typography.Link>
          <Popconfirm title="Are you sure to cancel?" onConfirm={cancel}>
            <Link>Cancel</Link>
          </Popconfirm>  
        </span>
       ):(
        <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>Edit</Typography.Link>
       )
      }
    } 
  ]
  const mergedColumns = columns.map(col => {
   if(!col.editable){
    return col
   }
   return{
    ...col,
    onCell:record => ({
     record,
     dataIndex:col.dataIndex,
     title:col.title,
     editing:isEditing(record)
    })
   } 
  })
  return(
   <Form form={form} component={false}>
     <ToastContainer/>
     <Space size="middle">
       <Link to="/">
         <ArrowLeftOutlined/>
       </Link>
     </Space>
     <Table
       rowKey="id"
       components={{
        body:{cell:EditEmployeeCell},
       }}
       bordered
       dataSource={employeeList} 
       columns={mergedColumns}
       rowClassName="editable-row"
       pagination={{pageSize:5}}
     />
   </Form>
  )
}
export default EmployeeList