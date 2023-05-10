import Client from "@/components/Client";
import Layout from "@/components/Layout";
import { gql, useQuery } from "@apollo/client"
import Link from "next/link";
import { useRouter } from "next/router";

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

	const router = useRouter();

	const { data, loading, client } = useQuery(GET_CLIENTS_BY_USER) || {};

	if(loading) return "Loading...";


	if(!data.getClientBySeller) {
		client.clearStore();
        router.push('/login');
		return <p>Loading...</p>
    }

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Clients</h1>

			<Link href="/createClient">
				<span className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm capitalize font-bold hover:bg-gray-800">New client</span>
			</Link>

			<table className="table-auto shadow-md mt-10 w-full w-lg">
				
				<thead className="bg-gray-800">
					<tr className="text-white">
						<th className="w-1/5 py2">Name</th>
						<th className="w-1/5 py2">Company</th>
						<th className="w-1/5 py2">Email</th>
						<th className="w-1/5 py2">Delete</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{data.getClientBySeller.map( client => (
						<Client key={client.id} client={client}/>
					))}
				</tbody>

			</table>

		</Layout>
	);
}

export default Index;
