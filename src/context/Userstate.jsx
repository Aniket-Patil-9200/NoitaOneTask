import React, { createContext, useState } from 'react'

export const usercontext = createContext()

function Userstate({ children }) {

  const [data, setData] = useState({
    email: "",
    password: "",
    type: "user" // Defaulting to "user"
  });

  const [formValid, setFormValid] = useState(false);


  const Data = {
    data, setData, formValid, setFormValid
  }



  return (
    <usercontext.Provider value={Data} >

      {children}

    </usercontext.Provider>
  )
}

export default Userstate