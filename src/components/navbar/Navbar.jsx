import React, { useEffect, useContext } from 'react'
import { Button } from '../ui/button'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import userContext from '@/scripts/userContext'

export default function Navbar() {

    const userState = useContext(userContext)


    const connectMetaMask = async () => {
        let provider;
        if (window.ethereum) {
          provider = window.ethereum;
          try {
            await provider.request({method: 'eth_requestAccounts'});
            userState.setIsConnected(true);
          }
          catch (e) {
            console.log(e);
          }
        }
      }

    const SignIn = async () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          const accounts = await provider.request({method: 'eth_requestAccounts'})
          const account = accounts[0]
          const newUser = {userAddress: account}
          userState.setUser(newUser)
          userState.setIsSignedIn(true)
        }
        catch (e) {

        }
      }
    }

    const SignOut = () => {
      userState.setUser(null)
      userState.setIsSignedIn(false)
    }


    useEffect(() => {
        connectMetaMask();
        userState.setUser(userState.user)
    },[userState.user]);

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
                userState.isConnected ?
                <>
                    <Button variant="ghost">Wallet Connected</Button>
                </>
                :
                <>
                    <Button>Connect Wallet</Button>
                </>
            }
            {
                userState.isSignedIn ?
                <div className='flex items-center gap-2'>
                    <div>Hello {userState.user.userAddress}</div>
                    <Button variant="ghost">Dashboard</Button>
                    <Button onClick={SignOut}>Sign Out</Button>
                </div>
                :
                <>
                    <Button onClick={SignIn}>Sign In / Register</Button>
                </>
            }
        </div>
    </div>
  )
}
