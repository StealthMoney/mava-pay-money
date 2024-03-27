import { Faq } from "./components/faq"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { WaitList } from "./components/waitlist"
import { SayHello } from "./components/say-hello"
import { HowItWorks } from "./components/how-it-works"
import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import Head from "next/head"

export default function Home() {
    return (
        <>
            <Head>
                <title>Mava pay money - Global money at your fingertips</title>
                <meta
                    name="description"
                    content="Mava pay money is a global money transfer platform that allows you to receive money from your loved ones in any country at the speed of lightning. Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin."
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
            </Head>
            <main className="flex min-h-screen bg-black flex-col items-center pt-0">
                <Navbar />
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <Faq />
                <SayHello />
                <Footer />
            </main>
        </>
    )
}
