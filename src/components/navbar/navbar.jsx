import React from 'react'
import { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [signedIn, setSignedIn] = useState(false);

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
                    <li><Link to="sign-out">Sign Out</Link></li>
                  </> : 
                  <>
                  <li><Link to="sign-in">Sign In</Link></li>
                  <li><Link to="register">Register</Link></li>
                  </>
                }
              
              </ul>
            </nav>
        </div>
    </>
  )
}
