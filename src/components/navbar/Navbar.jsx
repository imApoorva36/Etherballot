import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { AlertDestructive } from './alert'

export default function Navbar() {

    const [isConnected, setIsConnected] = useState();
    const [isSignedIn, setIsSignedIn] = useState();
    const [error, setError] = useState(false);

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
        }else {
          setError(true);
        }
      }


     
    useEffect(() => {
        connectMetaMask();
    },[]);

  return (
    <div className="flex border-b px-10 py-5 justify-between items-center">
        <div className='flex gap-4 items-center'>
          <div> 
            <img src={logo} alt="EtherBallot Logo" />
          </div>
          <div className='text-4xl font-mono'>
            EtherBallot
          </div>
        </div>
        <div className='flex justify-between gap-8'>
            {
                isConnected ?
                <>
                    <Button variant="ghost">Wallet Connected</Button>
                </>
                :
                <>
                    <Button >Connect Wallet</Button>
                </>
            }
            {
                isSignedIn ?
                <>
                    <Button variant="ghost">Dashboard</Button>
                </>
                :
                <>
                    <Button>Sign In / Register</Button>
                </>
            }

        </div>
        {error && (
                <div className="flex justify-center items-center absolute inset-0">
                    <div className="bg-red p-4 rounded-lg shadow-lg">
                        <AlertDestructive />
                    </div>
                </div>
            )}
    </div>
  )
}
