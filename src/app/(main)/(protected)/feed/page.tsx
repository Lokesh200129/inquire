import Feed from './child'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feed ",
    description: "Explore the latest insights, trending questions, and professional discussions from your network on Inquire.",
};
const page = () => {
    return (
        <Feed />
    )
}

export default page