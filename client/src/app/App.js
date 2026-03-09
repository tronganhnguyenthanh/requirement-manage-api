import {Route, Routes} from "react-router-dom"
import FormEmployee from "../components/employee/FormEmployee"
import EmployeeList from "../components/employee/EmployeeList"
const App = () => {
  return (
   <div className="App">
     <Routes>
       <Route path="/" element={<FormEmployee/>}/>
       <Route path="/employee/list" element={<EmployeeList/>}/> 
     </Routes>
   </div>
  )
}
export default App
