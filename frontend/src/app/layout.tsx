import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mikan Todo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
        <head>
            <meta charSet="utf-8" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icon/icon-192x192.png" />
            <meta name="theme-color" content="#f98518" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Mikan Todo App, a fun & fancy to-do management app that fits your life." />
            <title>Mikan Todo App</title>
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
