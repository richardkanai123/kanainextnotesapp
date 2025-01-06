"use client";
import { type Editor } from "@tiptap/react";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { MdOutlineFormatStrikethrough } from "react-icons/md";
import { FaParagraph } from "react-icons/fa";
import { BsTypeH1, BsTypeH3 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { MdFormatListBulleted } from "react-icons/md";



export const TiptapToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return (
            <div className="w-full p-2">
                <p className="text-sm text-gray-500">Loading Editor...</p>
            </div>
        )
    }

    return (
        <div className="w-full flex items-center align-middle justify-center gap-2 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none rounded-sm  max-w-full bg-opacity-70 border-t mb-1 border-input shadow-sm p-2 flex-wrap">
            <Button
                size="icon"
                variant={editor.isActive("bold") ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() => editor.chain().focus().toggleBold().run()}>
                <FaBold className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant={editor.isActive("italic") ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() => editor.chain().focus().toggleItalic().run()}>
                <FaItalic className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant={editor.isActive("strike") ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() => editor.chain().focus().toggleStrike().run()}>
                <MdOutlineFormatStrikethrough className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant={editor.isActive("paragraph") ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() => editor.chain().focus().setParagraph().run()}>
                <FaParagraph className="w-4 h-4" />
            </Button>

            <Button
                size="icon"
                variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }>
                <BsTypeH1 className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }>
                <BsTypeH2 className="w-4 h-4" />
            </Button>
            <Button
                size="icon"
                variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }>
                <BsTypeH3 className="w-4 h-4" />
            </Button>

            <Button
                size="icon"
                variant={editor.isActive('bulletList') ? "default" : "outline"}
                type="button"
                className="px-2 py-1 border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 text-sm font-medium leading-4  text-slate-700 disabled:cursor-not-allowed disbaled:bg-transparent disabled:opacity-50"
                onClick={() => {
                    if (editor.isActive('orderedList')) {
                        editor.chain().focus().toggleOrderedList().run()
                        editor.chain().focus().toggleBulletList().run()
                    } else {
                        // editor.chain().focus().wrapInList('bulletList').run()
                        editor.chain().focus().toggleBulletList().run()
                    }
                }}>
                <MdFormatListBulleted className="w-4 h-4" />
            </Button>

        </div>
    );
};