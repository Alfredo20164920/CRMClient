import Layout from "@/components/Layout";
import { gql, useQuery } from "@apollo/client"

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

const Index = () => {

	const { data, loading, error } = useQuery(GET_CLIENTS_BY_USER);

	if(loading) return "Loading..."

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Clients</h1>

			<table className="table-auto shadow-md mt-10 w-full w-lg">
				
				<thead className="bg-gray-800">
					<tr className="text-white">
						<th className="w-1/5 py2">Name</th>
						<th className="w-1/5 py2">Company</th>
						<th className="w-1/5 py2">Email</th>
					</tr>
				</thead>
				
				<tbody className="bg-white">
					{data.getClientBySeller.map( client => (
						<tr key={client.id} className="text-gray-800">
							<td className="border px-4 py-2">{client.name} {client.lastName}</td>
							<td className="border px-4 py-2">{client.company} </td>
							<td className="border px-4 py-2">{client.email} </td>
						</tr>
					))}
				</tbody>

			</table>

		</Layout>
	);
}

export default Index;
