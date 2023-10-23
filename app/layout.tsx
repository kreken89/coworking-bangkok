import type { Metadata } from 'next'
import './globals.css'
import { Nunito } from "next/font/google"
import Navbar from './components/navbar/Navbar'
import HomeBackground from './components/HomeBackground'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'




export const metadata: Metadata = {
  title: 'Coworking bangkok',
  description: 'Coworking bangkok clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        <HomeBackground />
        {children}</body>
    </html>
  );
}
