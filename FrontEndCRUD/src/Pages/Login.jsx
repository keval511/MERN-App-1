import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    // const validationSchema = Yup.object({
    //     email: Yup.string()
    //         .trim()
    //         .email('Invalid email format')
    //         .required('Email is required'),
    //     password: Yup.string()
    //         .trim()
    //         .required('Password is required'),
    // });

    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //     },
    //     validationSchema,
    //     onSubmit: async (values, { setSubmitting }) => {
    //         try {
    //             // Your login API call would go here
    //             console.log('Login submitted:', values);
    //             // Simulate API call delay
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //         } catch (error) {
    //             console.error('Login error:', error);
    //         } finally {
    //             setSubmitting(false);
    //         }
    //     },
    // });

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:5000/auth/login';

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });

            const data = await response.json(); // ✅ use await

            const {success,msg,jwtToken,email,password,name} =data

            if (success) {
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser',name)
                setTimeout(() => {
                    navigate("/home");
                }, 1500);
            } else {
                // Optional: show error
                console.error("Login failed:", data.msg);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(50vh - 100px)',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box',
            backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '300px',
                transition: 'all 0.3s ease',
                ':hover': {
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                }
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{
                        color: '#333',
                        margin: '0 0 10px 0',
                        fontSize: '28px',
                        fontWeight: '700'
                    }}>Welcome Back</h1>
                    <p style={{
                        color: '#666',
                        margin: '0',
                        fontSize: '14px'
                    }}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#555',
                            fontWeight: '600',
                        }}>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                transition: 'all 0.3s',
                                ':focus': {
                                    borderColor: '#646cff',
                                    boxShadow: '0 0 0 2px rgba(100, 108, 255, 0.2)'
                                }
                            }}
                            onChange={handleChange}
                            value={loginInfo.email}
                        />
                        {/* {formik.touched.email && formik.errors.email && (
                            <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}>
                                {formik.errors.email}
                            </div>
                        )} */}
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <label style={{
                                fontSize: '14px',
                                color: '#555',
                                fontWeight: '600',
                            }}>Password</label>
                            <Link to='/forgot-password' style={{
                                fontSize: '12px',
                                color: '#646cff',
                                textDecoration: 'none',
                                fontWeight: '500',
                                ':hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                transition: 'all 0.3s',
                                ':focus': {
                                    borderColor: '#646cff',
                                    boxShadow: '0 0 0 2px rgba(100, 108, 255, 0.2)'
                                }
                            }}
                            onChange={handleChange}
                            value={loginInfo.password}
                        />
                        {/* {loginInfo.password?.err && (
                            <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}>
                                {loginInfo?.password}
                            </div>
                        )} */}
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#646cff',
                            color: 'white',
                            padding: '14px',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            transition: 'all 0.3s',
                            ':hover': {
                                backgroundColor: '#535bf2',
                                transform: 'translateY(-2px)'
                            },
                            ':active': {
                                transform: 'translateY(0)'
                            },
                        }}
                    >
                        <span>Sign In</span>
                    </button>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px',
                        position: 'relative'
                    }}>
                        <div style={{
                            height: '1px',
                            backgroundColor: '#e0e0e0',
                            flex: 1
                        }}></div>
                        <span style={{
                            padding: '0 10px',
                            color: '#999',
                            fontSize: '12px',
                            backgroundColor: 'white'
                        }}>OR</span>
                        <div style={{
                            height: '1px',
                            backgroundColor: '#e0e0e0',
                            flex: 1
                        }}></div>
                    </div>



                    <div style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#666',
                    }}>
                        Don't have an account? <Link
                            to='/signup'
                            style={{
                                color: '#646cff',
                                textDecoration: 'none',
                                fontWeight: '600',
                                ':hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >Sign up</Link>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default Login;