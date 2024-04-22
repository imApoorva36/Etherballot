function web3_check_metamask() {
    if (!window.ethereum) {
        console.error('No metamask');
        alert('No metamask extension. Kindly install Metamask before proceeding.');
        return false;
    }else {
        console.log('MetaMask detected.');
        return true;
    }
}        
async function web3_metamask_login() {
          if ( web3_check_metamask() ) {
              console.log('Initate Login Process');
              const provider = new ethers.providers.Web3Provider(window.ethereum);                    
              await provider.send("eth_requestAccounts", []);
              console.log("Connection successful."); 
              const address = await provider.getSigner().getAddress();
              console.log(address);   
          }
      }  

