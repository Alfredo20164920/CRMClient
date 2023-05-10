import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
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

const Product = ({product}) => {

    const {id, name, price, stock} = product;

	const router = useRouter();

    // Mutatation delete
    const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
        update(cache){
            const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: getProducts.filter(p => p.id !== id)
                }
            })
        }
    });

	// Delete product
    const onDeleteProduct = () => {
        Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then( async (result) => {
			if (result.isConfirmed) {

                try {

                    // delete by id
                    const { data } = await deleteProduct({
                        variables: {
                            id
                        }
                    })

                    //show alert
                    Swal.fire("Deleted!", data.deleteClient, "success");
                } catch (error) {
                    console.log(error);
                }

			}
		});
    }

	// Update product
	const onUpdateProduct = () => {
		router.push({
			pathname: "/editproduct/[id]",
			query: { id }
		})
	}

    return (
        <tr className="text-gray-800">
			<td className="border px-4 py-2">
				{name} 
			</td>
			<td className="border px-4 py-2 text-center">${price} </td>
			<td className="border px-4 py-2 text-center">{stock} </td>
            <td className="border px-4 py-2">
				<button
					type="button"
					className="flex justify-center items-center bg-blue-600  py-2 px-4 w-full text-white rounded text-md uppercase font-bold gap-3"
					onClick={() => onUpdateProduct()}
				>
					Edit
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</button>
			</td>
			<td className="border px-4 py-2">
				<button
					type="button"
					className="flex justify-center items-center bg-red-600 py-2 px-4 w-full text-white rounded text-md uppercase font-bold gap-3"
                    onClick={() => onDeleteProduct()}
				>
					Delete
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
						/>
					</svg>
				</button>
			</td>
			
		</tr>
    )
}

export default Product