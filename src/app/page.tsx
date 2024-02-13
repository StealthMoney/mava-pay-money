import { Faq } from "./components/faq"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { WaitList } from "./components/waitlist"
import { SayHello } from "./components/say-hello"
import { HowItWorks } from "./components/how-it-works"
import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-0">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <Faq />
            <SayHello />
            <WaitList />
            <Footer />
        </main>
    )
}
