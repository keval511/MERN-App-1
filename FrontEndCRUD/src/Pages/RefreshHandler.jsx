import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthentication}) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
            if(localStorage.getItem('token')){
                setIsAuthentication(true)
                if(location.pathname === '/' || location.pathname === '/login' ||location.pathname === '/signup' ){
                    navigate('/home' , replace(false))
                }
            }
    },[location,navigate,setIsAuthentication])
  return (
    <div>
        
    </div>
  )
}

export default RefreshHandler