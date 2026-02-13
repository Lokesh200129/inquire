'use client';
import { Search, MessageCircle, Users, FileText, Shield, Settings } from 'lucide-react';
import Link from 'next/link';

const helpCenterData = {
    header: {
        title: 'Help Center',
        description: 'Find answers to common questions and learn how to make the most of Inquire'
    },
    searchPlaceholder: 'Search for help...',
    categories: [
        {
            icon: MessageCircle,
            title: 'Getting Started',
            description: 'Learn the basics of using Inquire',
            topics: [
                'How to ask a question',
                'How to write a great answer',
                'Understanding spaces and topics',
                'Building your profile'
            ]
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Connect and engage with others',
            topics: [
                'Following topics and people',
                'Upvoting and commenting',
                'Joining spaces',
                'Community guidelines'
            ]
        },
        {
            icon: FileText,
            title: 'Content',
            description: 'Managing your questions and answers',
            topics: [
                'Editing your content',
                'Deleting questions or answers',
                'Adding images and links',
                'Formatting options'
            ]
        },
        {
            icon: Shield,
            title: 'Privacy & Safety',
            description: 'Protecting your account and data',
            topics: [
                'Privacy settings',
                'Blocking users',
                'Reporting content',
                'Account security'
            ]
        },
        {
            icon: Settings,
            title: 'Account Settings',
            description: 'Customize your experience',
            topics: [
                'Notification preferences',
                'Email settings',
                'Language and region',
                'Deactivating your account'
            ]
        },
        {
            icon: Search,
            title: 'Search & Discovery',
            description: 'Find what you\'re looking for',
            topics: [
                'Using search effectively',
                'Discovering new topics',
                'Finding experts',
                'Trending questions'
            ]
        }
    ],
    contactSupport: {
        title: 'Still need help?',
        description: 'Can\'t find what you\'re looking for? Our support team is here to help.',
        buttonText: 'Contact Support',
        buttonHref: '/contact'
    }
};

export default function HelpCenterPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">{helpCenterData.header.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {helpCenterData.header.description}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={helpCenterData.searchPlaceholder}
                            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                        />
                    </div>
                </div>

                {/* Help Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {helpCenterData.categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-background border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <category.icon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {category.topics.map((topic, topicIndex) => (
                                        <li key={topicIndex}>
                                            <Link
                                                href="#"
                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {topic}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="border-t border-border pt-12">
                    <div className="bg-muted/50 rounded-lg p-8 text-center border border-border">
                        <h2 className="text-2xl font-semibold text-foreground mb-3">
                            {helpCenterData.contactSupport.title}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {helpCenterData.contactSupport.description}
                        </p>
                        <Link
                            href={helpCenterData.contactSupport.buttonHref}
                            className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
                        >
                            {helpCenterData.contactSupport.buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}