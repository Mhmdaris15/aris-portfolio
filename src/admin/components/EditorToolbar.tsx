import type { Editor } from "@tiptap/react";
import {
  LuBold,
  LuItalic,
  LuCode,
  LuFileCode2,
  LuList,
  LuListOrdered,
  LuQuote,
  LuLink,
  LuHeading2,
  LuHeading3,
  LuUndo2,
  LuRedo2,
  LuFileDown
} from "react-icons/lu";
import { useState } from "react";

interface Props {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: Props) => {
  const [mdOpen, setMdOpen] = useState(false);
  const [mdText, setMdText] = useState("");

  if (!editor) return null;

  const insertMarkdown = () => {
    if (!mdText.trim()) {
      setMdOpen(false);
      return;
    }
    // tiptap-markdown registers a `setContent` parser that handles MD strings
    // when the source string is plain text. Easiest path: insert via the
    // editor's commands, which run through the same paste pipeline.
    editor
      .chain()
      .focus()
      .insertContent(mdText, {
        parseOptions: { preserveWhitespace: "full" }
      })
      .run();
    setMdText("");
    setMdOpen(false);
  };

  const btn = (
    onClick: () => void,
    isActive: boolean,
    label: string,
    icon: React.ReactNode
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`tool-btn ${isActive ? "active" : ""}`}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );

  const promptLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="editor-toolbar">
      {btn(
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        editor.isActive("heading", { level: 2 }),
        "Heading 2",
        <LuHeading2 />
      )}
      {btn(
        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        editor.isActive("heading", { level: 3 }),
        "Heading 3",
        <LuHeading3 />
      )}

      <span className="tool-divider" />

      {btn(
        () => editor.chain().focus().toggleBold().run(),
        editor.isActive("bold"),
        "Bold",
        <LuBold />
      )}
      {btn(
        () => editor.chain().focus().toggleItalic().run(),
        editor.isActive("italic"),
        "Italic",
        <LuItalic />
      )}
      {btn(
        () => editor.chain().focus().toggleCode().run(),
        editor.isActive("code"),
        "Inline code",
        <LuCode />
      )}
      {btn(promptLink, editor.isActive("link"), "Link", <LuLink />)}

      <span className="tool-divider" />

      {btn(
        () => editor.chain().focus().toggleBulletList().run(),
        editor.isActive("bulletList"),
        "Bullet list",
        <LuList />
      )}
      {btn(
        () => editor.chain().focus().toggleOrderedList().run(),
        editor.isActive("orderedList"),
        "Numbered list",
        <LuListOrdered />
      )}
      {btn(
        () => editor.chain().focus().toggleBlockquote().run(),
        editor.isActive("blockquote"),
        "Quote",
        <LuQuote />
      )}
      {btn(
        () => editor.chain().focus().toggleCodeBlock().run(),
        editor.isActive("codeBlock"),
        "Code block",
        <LuFileCode2 />
      )}

      <span className="tool-divider" />

      {btn(
        () => editor.chain().focus().undo().run(),
        false,
        "Undo",
        <LuUndo2 />
      )}
      {btn(
        () => editor.chain().focus().redo().run(),
        false,
        "Redo",
        <LuRedo2 />
      )}

      <span className="tool-divider" />

      {btn(
        () => setMdOpen(true),
        false,
        "Paste markdown",
        <LuFileDown />
      )}

      {mdOpen && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setMdOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <header>
              <h3>Paste markdown</h3>
              <button type="button" onClick={() => setMdOpen(false)}>
                ×
              </button>
            </header>
            <p>
              Paste any markdown here — headings, lists, bold/italic, code
              blocks, blockquotes — and it'll insert as formatted content at
              your cursor position.
            </p>
            <textarea
              autoFocus
              value={mdText}
              onChange={(e) => setMdText(e.target.value)}
              placeholder={"## Heading\n\nSome **bold** text and a [link](https://example.com).\n\n- item 1\n- item 2"}
              rows={14}
              className="mono"
            />
            <div className="admin-modal-actions">
              <button
                type="button"
                onClick={insertMarkdown}
                className="admin-btn primary"
              >
                Insert
              </button>
              <button
                type="button"
                onClick={() => setMdOpen(false)}
                className="admin-btn ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
