'use client';

const guidelinesData = {
    title: 'Community Guidelines',
    description: 'Inquire is a place to share knowledge and better understand the world. These guidelines help us maintain a respectful and helpful community.',
    sections: [
        {
            title: 'Be Respectful',
            content: 'Treat everyone with respect and kindness. We don\'t tolerate harassment, hate speech, or personal attacks. Disagree respectfully and focus on ideas, not individuals.'
        },
        {
            title: 'Be Helpful',
            content: 'Share knowledge that helps others. Provide thoughtful, well-researched answers. If you\'re sharing opinions, make it clear they\'re opinions. Cite sources when possible and acknowledge when you\'re uncertain.'
        },
        {
            title: 'Be Authentic',
            content: 'Use your real identity and credentials. Don\'t impersonate others or create fake accounts. Be transparent about potential conflicts of interest or biases.'
        },
        {
            title: 'Ask Good Questions',
            content: 'Make your questions clear and specific. Provide context to help others understand what you\'re asking. Search for existing answers before posting duplicate questions.'
        },
        {
            title: 'No Spam or Self-Promotion',
            content: 'Don\'t use Inquire primarily for self-promotion or advertising. Relevant mentions of your work are fine, but excessive self-promotion will be removed. No spam, scams, or misleading content.'
        },
        {
            title: 'Respect Privacy',
            content: 'Don\'t share others\' private information without permission. Respect confidentiality and be mindful of what you share publicly.'
        },
        {
            title: 'Follow the Law',
            content: 'Don\'t post content that violates laws or regulations. This includes copyright infringement, illegal activities, or content that could cause harm.'
        }
    ],
    reportingSection: {
        title: 'Reporting Violations',
        content: 'If you see content that violates these guidelines, please report it. Our moderation team reviews all reports and takes appropriate action. We appreciate your help in keeping Inquire a positive space.'
    }
};

export default function GuidelinesPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">{guidelinesData.title}</h1>
                        <p className="text-lg text-muted-foreground">
                            {guidelinesData.description}
                        </p>
                    </div>

                    <div className="border-t border-border pt-8 space-y-10">
                        {/* Guidelines Sections */}
                        {guidelinesData.sections.map((section, index) => (
                            <section key={index} className="space-y-4">
                                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </section>
                        ))}

                        {/* Reporting Section */}
                        <section className="space-y-4 bg-muted/50 p-6 rounded-lg border border-border">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {guidelinesData.reportingSection.title}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {guidelinesData.reportingSection.content}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}