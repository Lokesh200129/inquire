import Navbar from "../(public)/components/navbar";
import Footer from "../(public)/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col w-full ">
            <header className="sticky top-8 z-50 w-full ">
                <Navbar />
            </header>

            <main className="flex-1 container mx-auto px-4 md:px-6 pt-12">
                {children}
            </main>

            <Footer />
        </div>
    );
}