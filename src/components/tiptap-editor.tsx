"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Code,
    Quote,
    Undo,
    Redo,
    Link2
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { TooltipWrapper } from './tool-tip-wrapper';
interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const buttonClass = (isActive: boolean) => cn(
        "p-2 rounded hover:bg-accent transition-colors",
        isActive && "bg-accent text-primary"
    );

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200">
            <TooltipWrapper content='Bold' side='top'>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass(editor.isActive('bold'))}
                >
                    <Bold size={16} />
                </Button>
            </TooltipWrapper>
            <TooltipWrapper content='Italic' side='top'>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={buttonClass(editor.isActive('italic'))}
                >
                    <Italic size={16} />
                </Button>
            </TooltipWrapper>
            <TooltipWrapper content='Wider' side='top'>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={buttonClass(editor.isActive('code'))}
                >
                    <Code size={16} />
                </Button>
            </TooltipWrapper>

            <div className="w-px h-6 bg-gray-200 mx-1" />
            <TooltipWrapper content='List' side='top'>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={buttonClass(editor.isActive('bulletList'))}
                >
                    <List size={16} />
                </Button>
            </TooltipWrapper >
            <TooltipWrapper content='List-Order' side='top'>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={buttonClass(editor.isActive('orderedList'))}
                >
                    <ListOrdered size={16} />
                </Button>
            </TooltipWrapper >
            <TooltipWrapper content='Quote' side='top'>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={buttonClass(editor.isActive('blockquote'))}
                >
                    <Quote size={16} />
                </Button>
            </TooltipWrapper >

            <div className="w-px h-6 bg-gray-200 mx-1" />
            <TooltipWrapper content='Hyperlink' side='top'>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    className={buttonClass(editor.isActive('link'))}
                >
                    <Link2 size={16} />
                </Button>
            </TooltipWrapper >

            <div className="flex-1" />
            <TooltipWrapper content='Undo' side='top'>

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo size={16} />
                </Button>
            </TooltipWrapper >
            <TooltipWrapper content='Redo' side='top'>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <Redo size={16} />
                </Button>
            </TooltipWrapper >

        </div >
    );
};

export const TiptapEditor = ({ value, onChange, placeholder = "Start writing..." }: TiptapEditorProps) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-6',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-6',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: 'ml-0',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-gray-300 pl-4 italic my-4',
                    },
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] max-h-[240px] overflow-y-auto p-3',
            },
        },
    });

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};