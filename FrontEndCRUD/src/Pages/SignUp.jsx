import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
const SignUp = () => {

    const navigate = useNavigate()

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required('Name is required'),
        email: Yup.string()
            .trim()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .trim()
            .min(2, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const url = 'http://localhost:5000/auth/signup';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                const { success, msg, error } = data

                if (success) {
                    toast.success('Signup successful!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });

                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }  else if(error){
                     toast.success(error, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }


                // Reset form after successful submission
                formik.resetForm();
            } catch (error) {
                toast.error(error.message || 'An error occurred during signup', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

 
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(50vh - 100px)',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '300px',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '20px',
                    fontSize: '24px',
                }}>Sign Up</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontSize: '14px',
                            color: '#555',
                            fontWeight: '600',
                        }}>Name</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter Your Name'
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: formik.touched.name && formik.errors.name ? '1px solid red' : '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                {formik.errors.name}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontSize: '14px',
                            color: '#555',
                            fontWeight: '600',
                        }}>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Your Email'
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: formik.touched.email && formik.errors.email ? '1px solid red' : '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontSize: '14px',
                            color: '#555',
                            fontWeight: '600',
                        }}>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Your Password'
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: formik.touched.password && formik.errors.password ? '1px solid red' : '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                {formik.errors.password}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#646cff',
                            color: 'white',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '15px',
                            opacity: formik.isSubmitting ? 0.7 : 1,
                        }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <div style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#666',
                    }}>
                        Already have an account? <Link
                            to='/login'
                            style={{
                                color: '#646cff',
                                textDecoration: 'none',
                                fontWeight: '600',
                            }}
                        >Login</Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;