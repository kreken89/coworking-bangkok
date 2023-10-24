import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from "next/font/google"
import Navbar from './components/navbar/Navbar'
import HomeBackground from './components/HomeBackground'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'




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
  //Get the 
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        <HomeBackground />
        {children}</body>
    </html>
  );
}
