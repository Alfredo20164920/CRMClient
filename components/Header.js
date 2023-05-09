import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useRouter } from 'next/router'

const GET_USER = gql`
    query GetUser {
        getUser {
            id
            name
            lastName
        }
    }
`;

const Header = () => {

    const router = useRouter();

    const {data, loading, client} = useQuery(GET_USER);

    if(loading) return "Loading..."

    if(!data) {
        client.clearStore();
        router.push('/login');
    }

    const { name, lastName } = data.getUser;

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className='flex justify-between items-center mb-6'>
            <p className='font-bold text-black'>Hola {name} {lastName}</p>
            <button 
                type='button'
                className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-sm rounded py-2 px-3 text-white shadow-md'
                onClick={ () => logOut() }
            >
                LogOut
            </button>
        </div>
    )
}

export default Header