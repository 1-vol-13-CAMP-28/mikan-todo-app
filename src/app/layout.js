import './globals.css'

export default function RootLayout({ children }) {
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
      <body>{children}</body>
    </html>
  )
}
