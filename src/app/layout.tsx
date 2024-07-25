
import './globals.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Kho giao diện TM Software',
  description: 'Kho giao diện TM Software , thiết kế giao diện chuyên nghiệp',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body >


        {children}
        

      </body>
    </html>
  )
}
