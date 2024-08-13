import React from 'react'
import { Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'

const HomeRoute = () => {
  return (
    <div>
        <Routes>
            <Routes path="/" element={<Home />} />
        </Routes>
    </div>
  )
}

export default HomeRoute