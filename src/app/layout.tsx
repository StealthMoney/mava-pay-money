import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Mava pay money - Global money at your fingertips",
    description:
        "Mava pay money is a global money transfer platform that allows you to receive money from your loved ones in any country at the speed of lightning. Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin.",
    openGraph: {
        title: "Mava pay money - Global money at your fingertips",
        description:
            "Mava pay money is a global money transfer platform that allows you to receive money from your loved ones in any country at the speed of lightning. Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin.",
        url: "https://mavapay.money",
        type: "website",
        images: [
            {
                url: "https://mavapay.money/images/Mava_Avatar_White1.jpg"
            }
        ]
    },
    twitter: {
        card: "summary",
        creator: "@mavapay_money",
        images: ["https://mavapay.money/images/Mava_Avatar_White1.jpg"]
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
