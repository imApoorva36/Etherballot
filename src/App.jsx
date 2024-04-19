import './App.css'
import Navbar from './components/navbar/navbar'
import {Route, Routes} from 'react-router-dom'

function App() {
  {document.title = "EtherBallot"}

  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/sign-in" element={<div>Sign In</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/sign-out" element={<div>Sign Out</div>} />
      </Routes>
    </div>
  )
}

export default App
