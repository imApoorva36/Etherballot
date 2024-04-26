import React from 'react'
import { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import {web3_metamask_login} from '../meta'

export default function Navbar() {

  const [signedIn, setSignedIn] = useState(false);
  const metamask = () => {
    if (!signedIn){
      web3_metamask_login();
      setSignedIn(true);
    }else{
      setSignedIn(false);
      if (confirm("Are you sure you want to log out?")==true)
      location.reload(); // change later 
      else setSignedIn(true);
    }
  }
  return (
    <>
        <div className="navbar">
            <Link className="title" to="/">EtherBallot</Link>
            <nav className="nav-elements">
              <ul>
                {
                  signedIn ? 
                  <>
                    <li><Link to="profile">Profile</Link></li>
                    <li><Link to="sign-out" onClick={metamask}>Sign Out</Link></li> {/*come back later*/}
                  </> : 
                  <>
                   <li><Link to="sign-in" onClick={metamask}>Sign In</Link></li>
                  <li><Link to="register">Register</Link></li>
                  </>
                }
              
              </ul>
            </nav>
        </div>
    </>
  )
}
