import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './index.css'

import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'

const App = () => {
    return (
        <>
            <Router>
                <div className='h-screen font-raleway'>
                    <Routes>
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/register' element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App