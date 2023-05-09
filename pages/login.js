import Layout from '@/components/Layout'
import React from 'react'

const Login = () => {
    return (
        <Layout>
            <h1 className="text-2xl text-white text-center font-light">Login</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col gap-5'
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
                            />

                        </div>

                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Password
                            </label>

                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner'
                                id='password'
                                type='password'
                                placeholder='.........'
                            />

                        </div>

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