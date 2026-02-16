import { Metadata } from "next";
import Profile from './child'

export const metadata: Metadata = {
    title: "Profile ",
    description: "View and manage your professional identity, bio, and contributions on Inquire.",
};
const page = () => {
    return (
        <Profile />
    )
}

export default page