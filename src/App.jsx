import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Header from "./Layout/Header"
import Home from "./Pages/Home"
import Footer from "./Layout/Footer"
import About from "./Pages/About"
import Error from "./Pages/Error"
import CreateApi from "./Pages/CRUD/CreateApi"
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewApi from "./Pages/CRUD/ViewApi"
import UpdateApi from "./Pages/CRUD/UpdateApi"
const App = () => {
  return (
   <>
   <Router>
    <Header/>
    <Routes>
    <Route path="/"element={<Home/>}></Route>
    <Route path="/about/about-us"element={<About/>}></Route>
    <Route path="/CreateApi"element={<CreateApi/>}></Route>
    <Route path="/getApi"element={<ViewApi/>}></Route>
    <Route path="/update/:productId"element={<UpdateApi/>}></Route>
    
    <Route path="*" element={<Error/>}/>
    <Route/>
    </Routes>
    <Footer/>
    </Router>
   </>
  )
}

export default App