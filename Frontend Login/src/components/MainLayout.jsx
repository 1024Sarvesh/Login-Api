import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router'

function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <Sidebar />

                <section className="w-full py-2 px-5">
                    <Outlet />
                </section>
            </main>

            <Footer />
        </>
    )
}

export default MainLayout