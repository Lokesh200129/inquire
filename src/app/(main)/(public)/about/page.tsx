'use client';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

const aboutData = {
    hero: {
        title: 'About Inquire',
        subtitle: 'A platform where curiosity meets knowledge. We\'re building a community where anyone can ask questions and get answers from people who really know.'
    },
    stats: [
        { number: '10M+', label: 'Questions Asked' },
        { number: '50M+', label: 'Answers Shared' },
        { number: '5M+', label: 'Active Users' },
        { number: '150+', label: 'Countries' }
    ],
    story: {
        title: 'Our Story',
        paragraphs: [
            'Inquire was born from a simple observation: the internet is full of information, but finding trustworthy, personalized answers to specific questions remains challenging. We wanted to create a space where real people could share their knowledge and experiences.',
            'What started as a small community of enthusiasts has grown into a global platform connecting millions of people. From students seeking homework help to professionals sharing industry insights, Inquire has become a trusted destination for knowledge seekers worldwide.',
            'Today, we continue to innovate and improve, always keeping our users at the heart of everything we do. Our goal is to make knowledge accessible to everyone, everywhere.'
        ]
    },
    values: [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To democratize knowledge and empower people to learn from each other. We believe that everyone has something valuable to share and everyone has something to learn.'
        },
        {
            icon: Users,
            title: 'Community First',
            description: 'We build tools that bring people together. Our platform is designed to foster meaningful conversations and connections between curious minds around the world.'
        },
        {
            icon: Lightbulb,
            title: 'Quality Over Quantity',
            description: 'We prioritize thoughtful, well-researched answers over quick responses. Our community values depth, nuance, and expertise in every contribution.'
        },
        {
            icon: Heart,
            title: 'Inclusive & Respectful',
            description: 'We welcome diverse perspectives and backgrounds. Everyone deserves to be treated with respect and dignity, regardless of their level of expertise.'
        }
    ],
    cta: {
        title: 'Join Our Community',
        description: 'Whether you\'re here to learn, share, or both, we\'re excited to have you. Start asking questions, sharing your knowledge, and connecting with curious minds.',
        buttonText: 'Get Started'
    }
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-5xl font-bold text-foreground">{aboutData.hero.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {aboutData.hero.subtitle}
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border">
                    {aboutData.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-foreground mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="space-y-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-foreground">{aboutData.story.title}</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        {aboutData.story.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-semibold text-foreground text-center">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {aboutData.values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-background border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-muted rounded-lg">
                                        <value.icon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">
                                            {value.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Section */}
                <div className="bg-muted/50 rounded-lg p-12 text-center border border-border">
                    <h2 className="text-3xl font-semibold text-foreground mb-4">
                        {aboutData.cta.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        {aboutData.cta.description}
                    </p>
                    <button className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors">
                        {aboutData.cta.buttonText}
                    </button>
                </div>
            </div>
        </div>

    );
}