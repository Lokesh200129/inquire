"use client"
import LandingPage from "@/components/landing-page"
import Navbar from "./(public)/components/navbar"
import Footer from "./(public)/components/footer"

export default function Home() {

  return (
    <div >
      <Navbar />
      <div className="mt-16">
        <LandingPage />
      </div>
      <Footer />
    </div>
  )
}
