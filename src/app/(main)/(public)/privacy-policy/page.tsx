'use client';

const privacyPolicyData = {
    title: 'Privacy Policy',
    lastUpdated: 'February 6, 2026',
    intro: 'At Inquire, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.',
    sections: [
        {
            number: 1,
            title: 'Information We Collect',
            items: [
                {
                    label: 'Account Information',
                    content: 'When you create an account, we collect your name, email address, and profile information.'
                },
                {
                    label: 'Content',
                    content: 'We collect the questions, answers, and comments you post on our platform.'
                },
                {
                    label: 'Usage Data',
                    content: 'We collect information about how you use Inquire, including pages visited, features used, and interactions with content.'
                },
                {
                    label: 'Device Information',
                    content: 'We collect information about the devices you use to access Inquire, including IP address, browser type, and operating system.'
                }
            ]
        },
        {
            number: 2,
            title: 'How We Use Your Information',
            intro: 'We use your information to:',
            listItems: [
                'Provide and improve our services',
                'Personalize your experience and content recommendations',
                'Communicate with you about updates and features',
                'Ensure the security and integrity of our platform',
                'Analyze usage patterns to improve functionality',
                'Comply with legal obligations'
            ]
        },
        {
            number: 3,
            title: 'Information Sharing',
            items: [
                {
                    label: 'Public Content',
                    content: 'Questions, answers, and profile information you choose to make public are visible to other users.'
                },
                {
                    label: 'Service Providers',
                    content: 'We may share information with trusted third-party service providers who help us operate our platform.'
                },
                {
                    label: 'Legal Requirements',
                    content: 'We may disclose information if required by law or to protect our rights and users\' safety.'
                }
            ],
            note: 'We do not sell your personal information to third parties.'
        },
        {
            number: 4,
            title: 'Data Security',
            content: 'We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
        },
        {
            number: 5,
            title: 'Your Rights',
            intro: 'You have the right to:',
            listItems: [
                'Access and update your personal information',
                'Delete your account and associated data',
                'Control privacy settings and content visibility',
                'Opt out of marketing communications',
                'Request a copy of your data'
            ]
        },
        {
            number: 6,
            title: 'Cookies and Tracking',
            content: 'We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. You can control cookies through your browser settings.'
        },
        {
            number: 7,
            title: 'Children\'s Privacy',
            content: 'Inquire is not intended for children under 13. We do not knowingly collect information from children under 13. If we become aware of such collection, we will delete the information promptly.'
        },
        {
            number: 8,
            title: 'Changes to This Policy',
            content: 'We may update this privacy policy from time to time. We will notify you of significant changes by email or through our platform. Your continued use of Inquire after changes indicates acceptance of the updated policy.'
        }
    ],
    contact: {
        title: 'Contact Us',
        content: 'If you have questions about this privacy policy or how we handle your data, please contact us at privacy@inquire.com or visit our contact page.'
    }
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">{privacyPolicyData.title}</h1>
                        <p className="text-muted-foreground">
                            Last updated: {privacyPolicyData.lastUpdated}
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {privacyPolicyData.intro}
                        </p>
                    </div>

                    <div className="border-t border-border pt-8 space-y-10">
                        {/* Sections */}
                        {privacyPolicyData.sections.map((section) => (
                            <section key={section.number} className="space-y-4">
                                <h2 className="text-2xl font-semibold text-foreground">
                                    {section.number}. {section.title}
                                </h2>

                                {section.content && (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {section.content}
                                    </p>
                                )}

                                {section.intro && (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {section.intro}
                                    </p>
                                )}

                                {section.items && (
                                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                                        {section.items.map((item, index) => (
                                            <p key={index}>
                                                <span className="font-medium text-foreground">{item.label}:</span> {item.content}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {section.listItems && (
                                    <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                                        {section.listItems.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.note && (
                                    <p className="font-medium text-foreground">
                                        {section.note}
                                    </p>
                                )}
                            </section>
                        ))}

                        {/* Contact */}
                        <section className="space-y-4 bg-muted/50 p-6 rounded-lg border border-border">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {privacyPolicyData.contact.title}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {privacyPolicyData.contact.content}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}