import React, { useEffect, useContext } from 'react'
import { Button } from '../ui/button'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { AlertDestructive } from './alert'
import userContext from '@/scripts/userContext'
import { Input } from '../ui/input'

export default function Navbar() {

    const [error, setError] = useState(false);
    const userState = useContext(userContext)
    const [isUserNamePresent, setIsUserNamePresent] = useState(false)
    const [userName, setUserName] = useState("")

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
  
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    const ABI = JSON.parse(import.meta.env.VITE_ABI)


    const contract = new ethers.Contract(contractAddress,ABI,signer)


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
        }else {
          setError(true);
        }
      }


     

    const SignIn = async () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          const accounts = await provider.request({method: 'eth_requestAccounts'})
          const account = accounts[0]
          const newUserName = await contract.getName(account)
          let newUser;
          if (newUserName == "") {
            newUser = {userAddress: account, userName: ""}
            setIsUserNamePresent(false)
          }
          else {
            newUser = {userAddress:account, userName: newUserName}
            setIsUserNamePresent(true)
          }
          userState.setUser(newUser)
          userState.setIsSignedIn(true)
        }
        catch (e) {
          console.log(e)
        }
      }
    }

    const SignOut = () => {
      userState.setUser(null)
      userState.setIsSignedIn(false)
    }


    useEffect(() => {
      SignIn()
    },[])

    const registerUser = async () => {
      if (userName) {
        const accounts = await provider.send('eth_requestAccounts')
        const account = accounts[0]
        const AddUserName = await contract.addToUniqueVoters(account,userName)
        await AddUserName.wait()
        console.log(AddUserName)
        SignIn()
      }
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
          <div className='text-4xl font-anek'>
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
                    <Button >Connect Wallet</Button>
                </>
            }
            {
                userState.isSignedIn ?
                <div className='flex items-center gap-2'>
                    {
                      isUserNamePresent ? 
                      <div>
                        Hello, {userState.user.userName}!
                      </div>
                      : 
                      <div className='flex gap-2'>
                        <Input placeholder="Enter Name" value={userName} onChange={
                          (e) => {
                            setUserName(e.target.value)
                          }
                        }/>
                        <Button onClick={registerUser}>Submit</Button>
                      </div>
                    }
                    <Button variant="ghost">Dashboard</Button>
                    <Button onClick={SignOut}>Sign Out</Button>
                </div>
                :
                <>
                    <Button onClick={SignIn}>Sign In / Register</Button>
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
