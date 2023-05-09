import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Sidebar = () => {

    const router = useRouter();

    return (
        <aside className='bg-gray-800 p-5 sm:w-1/3 sm:min-h-screen xl:w-1/6'>
            <div>
                <p className='text-white text-2xl font-black '>CRM Clients</p>
            </div>

            <nav>
                <ul className='mt-6 list-none flex flex-col gap-3'>
                    <li className={router.pathname === "/" ? "bg-blue-900 p-3" : "p-3"}>
                        <Link href="/">
                            <span className='text-white'>
                                Clients
                            </span>
                        </Link>
                    </li>
                    <li className={router.pathname === "/products" ? "bg-blue-900 p-3" : "p-3"}>
                        <Link href="/products">
                            <span className='text-white'>
                                Products
                            </span>
                        </Link>
                    </li>
                    <li className={router.pathname === "/orders" ? "bg-blue-900 p-3" : "p-3"}>
                        <Link href="/orders">
                            <span className='text-white'>
                                Orders
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar