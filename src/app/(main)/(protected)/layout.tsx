"use client"
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import TrendingTopics from "./components/trending-topics";
import { usePathname } from "next/navigation";
import Bottombar from "./components/bottom";
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const isProfile = pathName.startsWith('/profile')

    return (
        <div className="w-full bg-accent">
            <div className="flex mx-auto container w-full ">
                {/* Fixed Sidebar */}
                <aside className="w-64 bg-card hidden md:block sticky top-0 h-screen">
                    <Sidebar />
                </aside>

                <div className="flex flex-col md:flex-1 w-full ">
                    <main className="flex flex-1 flex-col md:flex-row">
                        <section className="w-full md:flex-1 p-6">
                            {children}
                        </section>
                        {!isProfile &&
                            <aside className="hidden md:block w-full md:w-1/3 border-l-2 border-gray-200  p-6">
                                <div className="sticky top-6">
                                    <TrendingTopics />
                                </div>
                            </aside>
                        }
                    </main>
                    <Footer />
                </div>
                <Bottombar />
            </div>
        </div>
    );
}