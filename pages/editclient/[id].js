import Layout from '@/components/Layout';
import { useRouter } from 'next/router'
import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const GET_CLIENT_BY_ID = gql`
    query GetClientById($id: ID!) {
        getClientById(id: $id) {
            id
            name
            lastName
            phone
            seller
            email
            company
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation UpdateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            id
            name
            lastName
            email
            company
            seller
            phone
        }
    }
`

const EditClient = () => {
	// GET ID
	const router = useRouter();
	const { query } = router;

    // GET CLIENT
    const { loading, data, error } = useQuery(GET_CLIENT_BY_ID, {
        variables: { id: query.id }
    });

    // Update client
    const [ updateClient ] = useMutation(UPDATE_CLIENT);

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Lastname is required'),  
        company: Yup.string().required('Company is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    })

    if (loading) return <p>Loading...</p>;
    // console.log(data.getClientById);
    const { getClientById } = data;

    // Modify client
    const onUpdateClient = async (values) => {
        const { name, lastName, email, company, phone} = values;

        try {
            const { data } = await updateClient({
                variables: {
                    id: query.id,
                    input: {
                        name,
                        lastName,
                        email,
                        company,
                        phone
                    }
                }
            })

            // Show sweet alert
            Swal.fire("Updated!", `Product ${data.updateClient.name} updated successfully`, "success");

            // Redirect   
            router.push('/');

        } catch (error) {
            console.log(error)
        }

    }

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getClientById}
                        onSubmit={(values) => {
                            onUpdateClient(values)
                        }}
                    >
                        {
                            props => {
                                return (
                                    <form
                                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col gap-5"
                                        onSubmit={props.handleSubmit}
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
                                                value={props.values.name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>

                                        {props.touched.name && props.errors.name ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.name}</p>
                                            </div>
                                        ) : null}

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
                                                value={props.values.lastName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>

                                        {props.touched.lastName && props.errors.lastName ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.lastName}</p>
                                            </div>
                                        ) : null}

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
                                                value={props.values.company}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>

                                        {props.touched.company && props.errors.company ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.company}</p>
                                            </div>
                                        ) : null}

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
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>

                                        {props.touched.email && props.errors.email ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.email}</p>
                                            </div>
                                        ) : null}

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
                                                value={props.values.phone}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>

                                        <input
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 capitalize text-white font-bold hover:bg-gray-600"
                                            value="Edit client"
                                        />
                                    </form>
                                )
                            }
                        }
                        
                    </Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditClient