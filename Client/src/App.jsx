import { BrowserRouter,Routes,Route } from "react-router-dom"

import Welcome from "./pages/Welcome"
import Home from "./pages/home"

const App = () => {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Welcome/>}/>
   <Route path="/Home" element={<Home/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App