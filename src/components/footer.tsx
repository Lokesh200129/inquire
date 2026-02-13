'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { useCurrentUser } from '@/hooks/auth/use-current-user';
import { usePathname } from 'next/navigation';

const footerLinks = [
    {
        title: 'Quick Links',
        items: [
            { name: 'Feed', href: '/feed' },
            { name: 'Create Profile', href: '/auth/signup' },
        ]
    },
    {
        title: 'Community',
        items: [
            { name: 'Guidelines', href: '/guidelines' },
            { name: 'Help Center', href: '/help-center' },
            { name: 'About', href: '/about' },
        ]
    },
    {
        title: 'Legal',
        items: [
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Contact', href: '/contact' }
        ]
    }
];

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Github', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: '#' }
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();
    const { data: user } = useCurrentUser();
    const isFeedPage = pathname === "/feed";
    if (isFeedPage) return null;

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call
        toast.success("Thanks for subscribing! We'll keep you updated with the best questions and answers.");
        setEmail("");

        setTimeout(() => setIsSubmitting(false), 2000);
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t mt-12 w-full bg-muted/40">
            <div className="container mx-auto px-8 py-12 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT SIDE: Brand & Newsletter */}
                    <div className="space-y-6">
                        <div>
                            <Link
                                href="/"
                                className="text-3xl font-bold text-foreground mb-4 block hover:text-muted-foreground transition-colors"
                            >
                                Inquire
                            </Link>
                            <p className="text-muted-foreground text-base max-w-md leading-relaxed">
                                A platform to ask questions, share knowledge, and learn from others.
                                Join our community of curious minds exploring topics that matter.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
                                Stay Updated
                            </h4>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1"
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8"
                                >
                                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Navigation Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerLinks.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-lg font-bold mb-6 text-foreground">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.items.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={user && link.name === 'Create Profile' ? `/profile/${user._id}` : link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                                            >
                                                {user && link.name === 'Create Profile' ? 'My Profile' : link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 mt-8 border-t border-border flex flex-col sm:flex-row justify-center items-center">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Inquire. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}