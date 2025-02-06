import { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import Providers from "@/lib/Providers";
import Titlebar from "@/components/Titlebar";

export const metadata: Metadata = {
    title: "Sticky",
    description: "not the tyler song",
    manifest: "/manifest.json"
}

const font = Inter({
    subsets: ["latin"]
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <Providers>
                <body className={font.className + " antialiased"}>
                    <Titlebar/>
                    {children}
                </body>
            </Providers>
        </html>
    )
}