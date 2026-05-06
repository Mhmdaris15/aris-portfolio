import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Markdown } from "tiptap-markdown";
import { common, createLowlight } from "lowlight";
import { useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

const lowlight = createLowlight(common);

interface Props {
  content: object | null;
  onChange: (json: object) => void;
  placeholder?: string;
}

const RichEditor = ({ content, onChange, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // we use the lowlight version below
        heading: { levels: [2, 3] }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" }
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing…"
      }),
      CodeBlockLowlight.configure({ lowlight }),
      // Auto-detect & parse markdown when pasted (or typed). Also lets us
      // serialize back to markdown via editor.storage.markdown.getMarkdown().
      Markdown.configure({
        html: false, // ignore raw HTML in input — markdown only
        tightLists: true,
        bulletListMarker: "-",
        linkify: true, // turn bare URLs into links
        breaks: false,
        transformPastedText: true, // <-- the key flag for paste auto-format
        transformCopiedText: true
      })
    ],
    content: content || { type: "doc", content: [] },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    }
  });

  // Update content when switching language tabs (parent passes a new doc).
  useEffect(() => {
    if (!editor) return;
    const incoming = JSON.stringify(content);
    const current = JSON.stringify(editor.getJSON());
    if (incoming !== current) {
      editor.commands.setContent(
        content || { type: "doc", content: [] },
        { emitUpdate: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, editor]);

  return (
    <div className="rich-editor">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="rich-editor-content" />
    </div>
  );
};

export type { Editor };
export default RichEditor;
