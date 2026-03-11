import {Card, Typography} from "antd"
import axios from "axios"
import {useEffect, useState} from "react"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
const TaskList = () => {
  const [taskLists, setTaskList] = useState([])
  const {Text, Title} = Typography
  useEffect(() => {
   getTaskLists()
  },[])
  const getTaskLists = async() => {
   const res = await axios.get("http://localhost:2204/api/v1/task/list")
   setTaskList(res?.data?.tasks)
  }
  return (
   <>
    <Link to="/form/task">
      <ArrowLeftOutlined/>
    </Link>
    {taskLists.length > 0 && taskLists.map((task, index) => {
      return(
       <Card type="inner" key={index} style={{marginTop:"5px"}}>
         <Title level={3}>
           <Text type="success">TaskId: (TSK{task?.id})</Text>
           <br/>
           <span style={{color:"darkkhaki"}}>Assignee:</span> {" "}
           <span style={{color:"lightcoral"}}>{task?.lastName} {task?.firstName}</span>
         </Title>
         {task?.task?.map((i) => {
           const text = i?.taskDescription?.split(".").filter(Boolean)
           return(
            <Text key={i?.taskId} type="success">
              <span style={{color:"darkkhaki"}}>Task name:</span> {" "}
              <span style={{color:"lightcoral",fontSize:"18px", fontWeight:"bold"}}>{i?.taskName}</span>
              <br/>
              <span style={{color:"darkkhaki"}}>Task description:</span> {" "}
              <span style={{color:"lightcoral"}}>
                {text.map((sentence, idx) => (
                  <div key={idx}>
                    {idx + 1}. {sentence}.
                  </div>
                 ))
                 }
              </span>
            </Text>
           )
         })}
       </Card> 
      )
     })
    }
   </>
  )
}
export default TaskList