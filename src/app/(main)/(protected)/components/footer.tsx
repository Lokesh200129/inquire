export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-4 border-2 ">
            <div className="container mx-auto px-4 flex justify-center items-center">
                <p className="text-muted-foreground text-sm">
                    © {currentYear} Inquire. All rights reserved.
                </p>
            </div>
        </footer>
    );
}