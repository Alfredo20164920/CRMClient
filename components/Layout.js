import React from "react";
import Head from 'next/head'
import Sidebar from "./Sidebar";

const Layout = ({children}) => {
	return (
        <>
            <Head>
                <title>CRM - Administración de clientes</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>

            <Sidebar />
            {
                children
            }
        </>
    );
};

export default Layout;