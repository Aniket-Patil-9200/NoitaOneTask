import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './Admin/Dashboard'
import Ticket from './Admin/Ticket'
import tDashboaard from './techsupport/Dashboard'
import uDashboaard from './user/Dashboard'
import Register from './components/Register'
import Users from './Admin/Users'
import Userstate from './context/Userstate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Userstate>
     <BrowserRouter>
     <Routes>
      <Route path='/' Component={Login}/>
      <Route path='/register' Component={Register}/>
      {/* admin routes */}
      <Route path='/admin' Component={Layout}>
        <Route path='/admin' Component={Dashboard}/>
        <Route path='/admin/ticket' Component={Ticket}/>
        <Route path='/admin/users' Component={Users} />
        <Route/>
      </Route>

      {/* TechSupport route */}
      {/* <Route path='/tech' Component={Layout}> */}
        <Route path='/techdashboard' Component={tDashboaard}/>
        <Route path='/userdashboard' Component={uDashboaard}/>
      {/* </Route> */}
      </Routes>
      </BrowserRouter>
      </Userstate>
    </>
  )
}

export default App
