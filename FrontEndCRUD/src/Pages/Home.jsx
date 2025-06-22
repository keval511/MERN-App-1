import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])
    const handleLogout = (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }

    const fetchProducts = async () => {
        try {
            const url = 'http://localhost:5000/api/products';
        const response =   await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setProducts(data)
            
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };
    
    useEffect(() => {
        fetchProducts()
    }, [])
    console.log(products);
    return (
        <>
            <div>{loggedInUser}</div>
            <button onClick={handleLogout}>Logout</button>
            {
                products.map((value, index) => (
                    <>
                        <div key={index}>

                            <div>{value?.name}</div>
                            <div>{value?.price}</div>

                        </div>
                    </>
                ))
            }
        </>
    )
}

export default Home