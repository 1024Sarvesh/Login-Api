import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

function MainLayout({children}) {
  return (
    <> 
    <Header/>
    <main className='flex'>
      <Sidebar/>
      <section className="w-full py-2 px-5">{children}</section>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout