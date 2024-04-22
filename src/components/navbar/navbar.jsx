import React from 'react'
import { useState, useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [isConnected, setIsConnected] = useState();

  const connectMetaMask = async () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      try {
        await provider.request({method: 'eth_requestAccounts'});
        setIsConnected(true);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(()=> {
    connectMetaMask();
  },[]);

  return (
    <>
        <div className="navbar">
            <Link className="title" to="/">EtherBallot</Link>
            <nav className="nav-elements">
              <ul>
                {
                  isConnected ? 
                  <>
                  <li><Link to="dashboard">Dashboard</Link></li>
                  </> : 
                  <>
                  <li onClick={connectMetaMask}>Connect Wallet</li>
                  </>
                }
              
              </ul>
            </nav>
        </div>
    </>
  )
}
