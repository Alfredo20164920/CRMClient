import Layout from '@/components/Layout'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const AUTHENTICATE_USER = gql`
    mutation AuthenticateUser($input: AuthenticateInput) {
        authenticateUser(input: $input) {
            token
        } 
    }
`;

const Login = () => {
    const [message, setMessage] = useState(null)

    const [ authenticateUser ] = useMutation(AUTHENTICATE_USER);

    // Routing
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {

            const { email, password } = values;

            try {
                const { data } = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });

                setMessage("Authenticating...");
                
                // Save token
                const { token } = data.authenticateUser;
                localStorage.setItem('token', token)

                // Redirect
                setMessage(null);
                router.push('/');

            } catch (error) {
                console.log(error)
                setMessage("Wrong credentials");

                setTimeout(() => {
                    setMessage(null)
                }, 3000);
            }
        }
    });

    const showMessage = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded'>
                <p className='text-gray-800'>{message}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-white text-center font-light">Login</h1>
            {message && showMessage()}
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col gap-5'
                        onSubmit={formik.handleSubmit}
                    >
                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
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
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
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

export default Login