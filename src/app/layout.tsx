import type { Metadata } from 'next'
import { Poppins, Macondo } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
// import { Toaster } from '@/components/ui/sonner'
import AuthInitializer from '@/components/custom/AuthInitializer'
import { Toaster } from 'sonner'

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-pop',
})

const MacondoFont = Macondo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mac',
})

export const metadata: Metadata = {
  title: 'PostCloud ',
  description:
    'A modern, plug-and-play email platform. Connect your Gmail, generate an API key, and start sending emails from your app instantly.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="utf-8">
      <body
        className={`${PoppinsFont.variable} ${MacondoFont.variable} antialiased`}
      >
        <Toaster richColors position="top-left" />
        <ThemeProvider
          attribute={'class'}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
