import './App.css'
import Navbar from './components/navbar/navbar'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/pages/landingPage/landingPage'
import Register from './components/pages/Register/register'
import SignIn from './components/pages/SignIn/signIn'
import Dashboard from './components/pages/Dashboard/dashboard'

function App() {
  {document.title = "EtherBallot"}

  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-out" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App
