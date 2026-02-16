import { Metadata } from "next";
import Discover from './child'
export const metadata: Metadata = {
    title: "Discover",
    description: "Browse through a curated feed of trending questions, expert insights, and community-driven discussions on Inquire.",
};
const page = () => {
    return (
        <Discover />
    )
}

export default page