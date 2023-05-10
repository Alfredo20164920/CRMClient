import React, { useState } from "react";
import Layout from "@/components/Layout";
import { gql, useMutation  } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: ProductInput) {
        createProduct(input: $input) {
            id
            name
            price
            stock
            created
        }
    }
`;

const GET_PRODUCTS = gql`
    query GetProducts {
        getProducts {
            id
            name
            price
            stock
            created
        }
    }
`;


const CreateProduct = () => {

    const [message, setMessage] = useState(null);

    // Mutation
    const [ createProduct ] = useMutation(CREATE_PRODUCT, {
        update(cache, {data: {createProduct}}){
            const { getProducts } = cache.readQuery({query: GET_PRODUCTS});

            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: [...getProducts, createProduct]
                }
            })
        }
    });
    
    const router = useRouter();

    // Validation
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            stock: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            price: Yup.number().required('Price is required').positive('Negative numbers are not accepted'),
            stock: Yup.number().required('Stock is required').positive('Negative numbers are not accepted').integer('Must be integers')
        }),
        onSubmit: async (values) => {
            // console.log(values);
            const { name, price, stock } = values;

            try {

                const { data } = await createProduct({
                    variables: {
                        input: {
                            name,
                            price,
                            stock
                        }
                    }
                });
                // console.log(data)

                // Alert
                Swal.fire("Saved!", `Product ${data.createProduct.name} created successfully`, "success");
                // Redirect
                router.push('/products');
            } catch (error) {
                setMessage(error.message);

                setTimeout(() => {
                    setMessage(null);
                },3000)
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
			<h1 className="text-2xl text-gray-800 font-light">New Product</h1>

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
								placeholder="Computer"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.name && formik.errors.name ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.name}</p>
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
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.price && formik.errors.price ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.price}</p>
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
								value={formik.values.stock}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.stock && formik.errors.stock ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-500 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.stock}</p>
							</div>
						) : null}

						<input
							type="submit"
							className="bg-gray-800 w-full mt-5 p-2 capitalize text-white font-bold hover:bg-gray-600"
							value="Create product"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default CreateProduct;
