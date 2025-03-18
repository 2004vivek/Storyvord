import { Inter } from "next/font/google"
import { QueryProvider } from "@/lib/query-provider"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Shopping App",
  description: "A shopping application built with Fake Store API",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="py-6 border-t">
                  <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Shopping App. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Powered by{" "}
                      <a href="https://fakestoreapi.com" className="underline" target="_blank" rel="noreferrer">
                        Vivek Kumar
                      </a>
                    </p>
                  </div>
                </footer>
              </div>
              <Toaster />
            </CartProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'