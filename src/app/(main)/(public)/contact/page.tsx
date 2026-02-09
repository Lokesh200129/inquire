'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

const contactPageData = {
    header: {
        title: 'Contact Us',
        description: 'Have a question or feedback? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
    },
    form: {
        title: 'Send us a message',
        fields: [
            {
                id: 'name',
                label: 'Name',
                type: 'text',
                placeholder: 'Your name',
                required: true,
                validationRules: {
                    minLength: 2,
                    errorMessages: {
                        required: 'Name is required',
                        minLength: 'Name must be at least 2 characters'
                    }
                }
            },
            {
                id: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'your.email@example.com',
                required: true,
                validationRules: {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    errorMessages: {
                        required: 'Email is required',
                        pattern: 'Please enter a valid email address'
                    }
                }
            },
            {
                id: 'message',
                label: 'Message',
                type: 'textarea',
                placeholder: 'Tell us what\'s on your mind...',
                required: true,
                rows: 6,
                validationRules: {
                    minLength: 10,
                    errorMessages: {
                        required: 'Message is required',
                        minLength: 'Message must be at least 10 characters'
                    }
                }
            }
        ],
        submitButton: 'Send Message',
        submittingText: 'Sending...'
    },
    contactInfo: {
        title: 'Other Ways to Reach Us',
        methods: [
            {
                icon: Mail,
                title: 'Email',
                content: 'support@inquire.com'
            },
            {
                icon: MessageCircle,
                title: 'Live Chat',
                content: 'Available Mon-Fri, 9am-5pm EST'
            },
            {
                icon: MapPin,
                title: 'Address',
                content: '123 Knowledge Street\nSan Francisco, CA 94102\nUnited States'
            }
        ]
    },
    helpCenterPromo: {
        title: 'Looking for quick answers?',
        description: 'Check out our Help Center for frequently asked questions and guides.',
        linkText: 'Visit Help Center →',
        linkHref: '/help'
    }
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        contactPageData.form.fields.forEach(field => {
            const value = formData[field.id as keyof typeof formData];
            const rules = field.validationRules;

            if (!value.trim()) {
                newErrors[field.id] = rules.errorMessages.required;
                isValid = false;
            } else if (rules.minLength && value.trim().length < rules.minLength) {
                newErrors[field.id] = rules.errorMessages.minLength;
                isValid = false;
            } else if (rules.pattern && !rules.pattern.test(value)) {
                newErrors[field.id] = rules.errorMessages.pattern;
                isValid = false;
            }
        });

        setErrors(newErrors as any);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            toast.success(`Thank you ${formData.name}! We've received your message and will get back to you soon.`);
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">{contactPageData.header.title}</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {contactPageData.header.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-background border border-border rounded-lg p-8">
                                <h2 className="text-2xl font-semibold text-foreground mb-6">
                                    {contactPageData.form.title}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {contactPageData.form.fields.map((field) => (
                                        <div key={field.id} className="space-y-2">
                                            <Label htmlFor={field.id} className="text-foreground">
                                                {field.label} {field.required && '*'}
                                            </Label>
                                            {field.type === 'textarea' ? (
                                                <Textarea
                                                    id={field.id}
                                                    name={field.id}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    rows={field.rows}
                                                    className={errors[field.id as keyof typeof errors] ? 'border-red-500' : ''}
                                                />
                                            ) : (
                                                <Input
                                                    id={field.id}
                                                    name={field.id}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    className={errors[field.id as keyof typeof errors] ? 'border-red-500' : ''}
                                                />
                                            )}
                                            {errors[field.id as keyof typeof errors] && (
                                                <p className="text-sm text-red-500">
                                                    {errors[field.id as keyof typeof errors]}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full"
                                    >
                                        {isSubmitting ? contactPageData.form.submittingText : contactPageData.form.submitButton}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="bg-background border border-border rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-foreground mb-6">
                                    {contactPageData.contactInfo.title}
                                </h3>
                                <div className="space-y-6">
                                    {contactPageData.contactInfo.methods.map((method, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="p-2 bg-muted rounded-lg">
                                                <method.icon className="w-5 h-5 text-foreground" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-foreground mb-1">{method.title}</h4>
                                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                    {method.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Link */}
                            <div className="bg-muted/50 border border-border rounded-lg p-6">
                                <h3 className="font-semibold text-foreground mb-2">
                                    {contactPageData.helpCenterPromo.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {contactPageData.helpCenterPromo.description}
                                </p>
                                <a
                                    href={contactPageData.helpCenterPromo.linkHref}
                                    className="text-sm font-medium text-foreground hover:underline"
                                >
                                    {contactPageData.helpCenterPromo.linkText}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}