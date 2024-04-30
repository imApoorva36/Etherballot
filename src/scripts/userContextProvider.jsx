import React, { useState } from "react";
import userContext from "./userContext";

const UserContextProvider = (props) => {

    const [user, setUser] = useState({})
    const [isConnected, setIsConnected] = useState();
    const [isSignedIn, setIsSignedIn] = useState();

    return (
        <userContext.Provider value={{user,setUser,isConnected,setIsConnected,isSignedIn,setIsSignedIn}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider