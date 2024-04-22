import React from 'react'
import './dashboard.css'
import Web3 from 'web3';
import { useState, useEffect } from 'react';

export default function Dashboard() {

  const [Balance, setBalance] = useState("");
  const [Address, setAddress] = useState("");
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

  const fetchAccountDetails = async () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setAddress(account);
        let balance = await web3.eth.getBalance(account);
        setBalance(balance.toString());
      }
      catch (err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      }
    }
  }

  useEffect(() => {
    connectMetaMask();
    fetchAccountDetails();
  }, []);

  

  return (
    <div className='db-wrapper'>
      <div className="sidebar">
        <ul>
          <li>Vote</li>
          <li>Host an Election</li>
        </ul>
      </div>
      <div className="main">
        <div className="account-details">
          {
            isConnected ?
            <>
              <div className="details">Account Address : {Address}</div>
              <div className="details">Account Balance: {Balance} ETH</div>
            </> :
              <div className="error details"> Metamask connection not found, please connect your wallet and try refreshing.</div>
          }
        </div>
        <div className="actions">
          ACTIONS TO BE ADDED
        </div>
      </div>
    </div>

  )
}
