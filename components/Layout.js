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
