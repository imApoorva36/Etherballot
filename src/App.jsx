import { Button } from './components/ui/button'
import './index.css'
import './App.css'
import Navbar from './components/navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import SignIn from './pages/signin/signin'

function App() {

  {document.title = "EtherBallot"}

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
