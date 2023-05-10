import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;

const GET_CLIENTS_BY_USER = gql`
	query GetClientBySeller {
		getClientBySeller {
			id
			name
			lastName
			company
			seller
			email
		}
	}
`;

const Client = ({client}) => {

    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        update(cache){
            const { getClientBySeller } = cache.readQuery({ query: GET_CLIENTS_BY_USER});

            cache.writeQuery({
                query: GET_CLIENTS_BY_USER,
                data: {
                    getClientBySeller: getClientBySeller.filter( actualClient => actualClient.id !== id )
                }
            })
        }
    });

    const {id, name, lastName, company, email} = client;

    // Delete client
    const onDeleteClient = () => {
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
                    const { data } = await deleteClient({
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
	};

	return (
		<tr className="text-gray-800">
			<td className="border px-4 py-2">
				{name} {lastName}
			</td>
			<td className="border px-4 py-2">{company} </td>
			<td className="border px-4 py-2">{email} </td>
			<td className="border px-4 py-2">
				<button
                    type='button'
                    className='flex justify-center items-center bg-red-600 py-2 px-4 w-full text-white rounded text-md uppercase font-bold gap-3'
                    onClick={() => onDeleteClient(id)}
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
	);
}

export default Client