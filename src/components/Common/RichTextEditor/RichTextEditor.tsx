import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  minHeight?: number;
}

const ToolbarBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      padding: "4px 8px",
      borderRadius: "5px",
      border: "none",
      background: active ? "var(--clr-primary)" : "transparent",
      color: active ? "#fff" : "var(--clr-dark-gray)",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1,
      minWidth: "28px",
    }}
  >
    {children}
  </button>
);

const RichTextEditor = ({
  value,
  onChange,
  error,
  label,
  required,
  minHeight = 200,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. form reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="form-group mb-5">
      {label && (
        <label className="block font-semibold mb-1 label-colr">
          {label} {required && <span className="mandatory-icon">*</span>}
        </label>
      )}

      {/* Toolbar */}
      <div className="rte-toolbar">
        <ToolbarBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <b>B</b>
        </ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <i>I</i>
        </ToolbarBtn>
        <ToolbarBtn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>
          <u>U</u>
        </ToolbarBtn>
        <ToolbarBtn title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
          <s>S</s>
        </ToolbarBtn>

        <span className="rte-divider" />

        <ToolbarBtn title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>
          H1
        </ToolbarBtn>
        <ToolbarBtn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          H2
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          H3
        </ToolbarBtn>

        <span className="rte-divider" />

        <ToolbarBtn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          ≡
        </ToolbarBtn>
        <ToolbarBtn title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          1.
        </ToolbarBtn>
        <ToolbarBtn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          "
        </ToolbarBtn>

        <span className="rte-divider" />

        <ToolbarBtn title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })}>
          ←
        </ToolbarBtn>
        <ToolbarBtn title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })}>
          ↔
        </ToolbarBtn>
        <ToolbarBtn title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })}>
          →
        </ToolbarBtn>

        <span className="rte-divider" />

        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarBtn>
      </div>

      {/* Editor body */}
      <div
        className="rte-body"
        style={{ minHeight }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} style={{ minHeight }} />
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default RichTextEditor;
