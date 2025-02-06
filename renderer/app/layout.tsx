import { Metadata } from "next";
import { Inter } from "next/font/google"
import "../styles/globals.css"

export const metadata: Metadata = {
    title: "Sticky",
    description: "not the tyler song"
}

const font = Inter({
    subsets: ["latin"]
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={font.className + " antialiased dots-bg"}>
                 {children}
            </body>
        </html>
    )
}