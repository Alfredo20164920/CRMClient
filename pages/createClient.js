import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation  } from '@apollo/client'
import { useRouter } from 'next/router'

const CREATE_CLIENT = gql`
    mutation CreateClient($input: ClientInput) {
        createClient(input: $input) {
            id
            name
            lastName
            company
            email
            phone
        }
    }
`;

const GET_CLIENTS_BY_USER = gql`
	query GetClientBySeller {
		getClientBySeller {
			id
			name
			lastName
			company
			email
		}
	}
`;

const CreateClient = () => {

    const [message, setMessage] = useState(null)

    // Rewrite cache
    const [ createClient ] = useMutation(CREATE_CLIENT, {
        update(cache, {data: {createClient}}) {
            const { getClientBySeller } = cache.readQuery({ query: GET_CLIENTS_BY_USER })

            cache.writeQuery({
                query: GET_CLIENTS_BY_USER,
                data: { getClientBySeller: [...getClientBySeller, createClient] }
            })
        }
    })
        

    const router = useRouter();

    // validations form
    const formik = useFormik({
        initialValues: {
            name: '', 
            lastName: '',
            company: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            lastName: Yup.string().required('Lastname is required'),  
            company: Yup.string().required('Company is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: async (values) => {
            const { name, lastName, company, email, phone } = values;

            try {

                const { data } = await createClient({
                    variables: {
                        input: {
                            name, 
                            lastName, 
                            company,
                            email,
                            phone
                        }
                    }
                });

                router.push("/"); // Clients
            } catch (error) {
                setMessage(error.message);

                setTimeout( () => {
                    setMessage(null);
                }, 2000)

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
				<h1 className="text-2xl text-gray-800 font-light">New Client</h1>

                {message && showMessage()}

				<div className="flex justify-center mt-5">
					<div className="w-full max-w-lg">
						<form 
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col gap-5"
                            onSubmit={formik.handleSubmit}
                        >
							<div>
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="name"
								>
									Name
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
									id="name"
									type="text"
									placeholder="John"
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
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="lastName"
								>
									Lastname
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
									id="lastName"
									type="text"
									placeholder="Doe"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>

                            {
                                formik.touched.lastName && formik.errors.lastName ? 
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.lastName}</p>
                                    </div>
                                ) : null
                            }

                            <div>
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="company"
								>
									Company
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
									id="company"
									type="text"
                                    placeholder="John Doe SA de CV"
									value={formik.values.company}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>

                            {
                                formik.touched.company && formik.errors.company ? 
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.company}</p>
                                    </div>
                                ) : null
                            }

                            <div>
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
									id="email"
									type="email"
									placeholder="example@example.com"
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
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="phone"
								>
									Phone
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
									id="phone"
									type="text"
									placeholder="xxx-xxx-xxxx"
									value={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>

                            <input 
                                type='submit'
                                className='bg-gray-800 w-full mt-5 p-2 capitalize text-white font-bold hover:bg-gray-600'
                                value="Register client"
                            />
						</form>
					</div>
				</div>
			</Layout>
		);
}

export default CreateClient