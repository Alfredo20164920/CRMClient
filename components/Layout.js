import React from "react";
import Head from 'next/head'
import Sidebar from "./Sidebar";
import { Router, useRouter } from "next/router";

const Layout = ({children}) => {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>CRM - Administración de clientes</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;300;400;500;600;700;900&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>

            {
                router.pathname === "/login" || router.pathname === "/register" ? 
                    (
                        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                            <div>
                                {children}
                            </div>
                        </div>
                    ) : 
                    (
                        <div className="bg-gray-200 min-h-screen">
                            <div className="flex min-h-screen">
                                <Sidebar />
                                <main className='bg-gray-200 p-5 sm:w-2/3 sm:min-h-screen xl:w-5/6'>
                                    {children}
                                </main>
                            </div>
                        </div>
                    )
            }

        </>
    );
};

export default Layout;
