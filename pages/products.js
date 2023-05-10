import Layout from '@/components/Layout'
import React from 'react'
import { gql, useQuery } from "@apollo/client"
import Product from '@/components/Product';

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

const Products = () => {

    const { data, loading, error} = useQuery(GET_PRODUCTS);

    if(loading) return <p>Loading...</p>

    return (
        <Layout>
            <h2 className="text-2xl text-gray-800 font-light">Products</h2>
            
            <table className="table-auto shadow-md mt-10 w-full w-lg">
				
				<thead className="bg-gray-800">
					<tr className="text-white">
						<th className="w-1/5 py2">Name</th>
						<th className="w-1/5 py2">Price</th>
						<th className="w-1/5 py2">Stock</th>
						<th className="w-1/5 py2">Edit</th>
						<th className="w-1/5 py2">Delete</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{
                        data.getProducts.map( (product) => (
                            <Product key={product.id} product={product}/>
                        ))
                    }
				</tbody>

			</table>

        </Layout>
    )
}

export default Products