import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import type React from "react" // Added import for React

const sourceSans = Source_Sans_3({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Техноаудит",
  description: "Приложение для технического аудита"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={sourceSans.className}>{children}</body>
    </html>
  )
}



import './globals.css'