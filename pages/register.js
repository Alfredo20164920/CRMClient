import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const Register = () => {

    // VALIDATE FORM
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Lastname is requiered'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        onSubmit: values => {
            console.log("Sending");
            console.log(values);
        }
    });




    return (
        <Layout>
            <h1 className="text-2xl text-white text-center font-light">Register</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col gap-5'
                        onSubmit={formik.handleSubmit}
                    >
                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Name
                            </label>

                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                                id='name'
                                type='text'
                                placeholder='John'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.name && formik.errors.name ? 
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null
                        }

                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                                Last Name
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                                id='lastname'
                                type='text'
                                placeholder='Doe'
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.lastname && formik.errors.lastname ? 
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ) : null
                        }

                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                                id='email'
                                type='email'
                                placeholder='example@example.com'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.email && formik.errors.email ? 
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null
                        }

                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner'
                                id='password'
                                type='password'
                                placeholder='.........'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {
                            formik.touched.password && formik.errors.password ? 
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null
                        }

                        <input 
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700'
                            value="Login"
                        />

                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default Register;