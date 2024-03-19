import React, { useState } from 'react';
import { UserContext } from "../Context/UserContext";

function UserStore({children}) {
    let [user,setUser] = useState([])
  return (
    <UserContext.Provider value={[user,setUser] }>
        {children}
        </UserContext.Provider >


  )
}

export default UserStore