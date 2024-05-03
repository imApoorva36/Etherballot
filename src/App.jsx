import { Button } from './components/ui/button'
import './index.css'
import './App.css'
import Navbar from './components/navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Elections from './pages/elections/Elections'
import Vote from './pages/vote/Vote'

function App() {

  {document.title = "EtherBallot"}

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/elections/create" element={<Admin/>} />
        <Route path="/elections/view" element={<Elections/>} />
        <Route path="/elections/vote/:electionId" element={<Vote />}/>
      </Routes>
    </>
  )
}

export default App
