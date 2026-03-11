import {Route, Routes} from "react-router-dom"
import FormEmployee from "../components/employee/FormEmployee"
import EmployeeList from "../components/employee/EmployeeList"
import FormTask from "../components/tasks/FormTask"
import TaskList from "../components/tasks/TaskList"
const App = () => {
  return (
   <div className="App">
     <Routes>
       <Route path="/" element={<FormEmployee/>}/>
       <Route path="/employee/list" element={<EmployeeList/>}/>
       <Route path="/form/task" element={<FormTask/>}/>
       <Route path="/task/list" element={<TaskList/>}/>
     </Routes>
   </div>
  )
}
export default App
