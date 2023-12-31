import { Nunito } from "next/font/google"

import './globals.css'

import type { Metadata } from 'next'
import Navbar from './components/navbar/Navbar'
import HomeBackground from './components/HomeBackground'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import SearchModal from "./components/modals/SearchModal"
import Footer from "./components/footer/Footer"




export const metadata: Metadata = {
  title: 'Coworking bangkok',
  description: 'Coworking bangkok clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        
        <div className="">
        {children}
        </div>
        <Footer />
        </body>
    </html>
  );
}
