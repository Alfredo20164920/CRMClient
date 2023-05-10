import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const GET_PRODUCT_BY_ID = gql`
	query GetProductById($id: ID!) {
		getProductById(id: $id) {
			id
			name
			price
			stock
			created
		}
	}
`;

const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($id: ID!, $input: ProductInput) {
		updateProduct(id: $id, input: $input) {
			id
			name
			price
			stock
			created
		}
	}
`;

const EditProduct = () => {
	// Get Id
	const router = useRouter();
	const { query } = router;

	// Get product
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
		variables: { id: query.id },
	});

    // Update product
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT);

    // Schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').positive('Negative numbers are not accepted'),
        stock: Yup.number().required('Stock is required').positive('Negative numbers are not accepted').integer('Must be integers')
    })

	if (loading) return <p>Loading...</p>;
	const { getProductById } = data;

    const onUpdateProduct = async (values) => {
        const {name, price, stock} = values;

        try {
            const { data } = await updateProduct({
                variables: {
                    id: query.id,
                    input: {
                        name, 
                        price,
                        stock
                    }
                }
            });

            Swal.fire("Updated!", `Product ${data.updateProduct.name} updated successfully`, "success");

            router.push('/products');

        } catch (error) {
            console.log(error)
        }

    }

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Edit Product</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<Formik
						validationSchema={validationSchema}
						enableReinitialize
						initialValues={getProductById}
						onSubmit={(values) => {
							onUpdateProduct(values);
						}}
					>
						{(props) => {
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
											placeholder="Computer"
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
											htmlFor="price"
										>
											Price
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
											id="price"
											type="number"
											placeholder="999.99"
											value={props.values.price}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.price && props.errors.price ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.price}</p>
                                        </div>
                                    ) : null}

									<div>
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="stock"
										>
											Stock
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
											id="stock"
											type="number"
											placeholder="50"
											value={props.values.stock}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.stock && props.errors.stock ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.stock}</p>
                                        </div>
                                    ) : null}

									<input
										type="submit"
										className="bg-gray-800 w-full mt-5 p-2 capitalize text-white font-bold hover:bg-gray-600"
										value="Update product"
									/>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditProduct;