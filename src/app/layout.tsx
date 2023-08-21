import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HeaderBar from '@/components/header/header-bar'
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GCBR Index',
  description: 'Global catastropic biological risks index',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <HeaderBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
