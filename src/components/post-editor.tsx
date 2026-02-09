"use client";

import { useEditor, EditorContent, } from "@tiptap/react";
import { BubbleMenu } from '@tiptap/extension-bubble-menu'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, Quote } from "lucide-react";

interface PostEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
    isTitle?: boolean;
}
export const PostEditor = ({ value, onChange, placeholder, className, isTitle }: PostEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: isTitle ? false : {},
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: className || "focus:outline-none min-h-[50px] prose prose-sm max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="relative w-full">
            <div className="flex items-center gap-1 bg-popover border rounded-lg shadow-md p-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded hover:bg-accent ${editor.isActive("bold") ? "text-primary bg-accent" : ""}`}
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded hover:bg-accent ${editor.isActive("italic") ? "text-primary bg-accent" : ""}`}
                >
                    <Italic className="h-4 w-4" />
                </button>
                {!isTitle && (
                    <>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-1.5 rounded hover:bg-accent ${editor.isActive("bulletList") ? "text-primary bg-accent" : ""}`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`p-1.5 rounded hover:bg-accent ${editor.isActive("blockquote") ? "text-primary bg-accent" : ""}`}
                        >
                            <Quote className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};