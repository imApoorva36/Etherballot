import { Button } from './components/ui/button'
import './index.css'
import './App.css'
import Navbar from './components/navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Admin from './pages/admin/admin'

function App() {

  {document.title = "EtherBallot"}

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </>
  )
}

export default App
