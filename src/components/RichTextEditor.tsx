import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { SpanStyle } from "@/extensions/SpanStyle";
import { useCallback, useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "本文を入力…（見出し・太字・配置など）",
  className,
  minHeight = "280px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
      SpanStyle,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-3 py-2",
      },
      handleDOMEvents: {
        blur: (_, __, view) => {
          const html = view.dom.innerHTML;
          onChange(html);
        },
      },
    },
  }, []);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && (value || "").trim() !== (current || "").trim()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  const syncOnChange = useCallback(() => {
    if (editor) onChange(editor.getHTML());
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor) return;
    editor.on("update", syncOnChange);
    return () => editor.off("update", syncOnChange);
  }, [editor, syncOnChange]);

  if (!editor) return null;

  return (
    <div className={cn("border border-[#E5E0D8] rounded-md bg-white overflow-hidden", className)}>
      {/* ツールバー */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-[#E5E0D8] bg-[#FAFAF8]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="太字"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="斜体"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <Separator />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="見出し2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="見出し3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <Separator />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="箇条書き"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="番号付きリスト"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <Separator />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="左揃え"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="中央揃え"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="右揃え"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <Separator />
        <span className="text-[10px] text-[#999999] px-1.5">文字</span>
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpanStyle({ size: "small" }).run()}
          active={editor.isActive("spanStyle", { size: "small" })}
          title="小さく"
        >
          <Type className="h-3.5 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpanStyle({ size: "large" }).run()}
          active={editor.isActive("spanStyle", { size: "large" })}
          title="大きく"
        >
          <span className="text-sm font-bold">A</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpanStyle({ transform: "uppercase" }).run()}
          active={editor.isActive("spanStyle", { transform: "uppercase" })}
          title="大文字（英字）"
        >
          <span className="text-[10px] font-medium">AB</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setSpanStyle({ transform: "lowercase" }).run()}
          active={editor.isActive("spanStyle", { transform: "lowercase" })}
          title="小文字（英字）"
        >
          <span className="text-[10px]">ab</span>
        </ToolbarButton>
      </div>
      <div style={{ minHeight }} className="overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 shrink-0",
        active && "bg-[#C4A962]/20 text-[#2C2C2C]"
      )}
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );
}

function Separator() {
  return <div className="w-px h-5 bg-[#E5E0D8] mx-0.5 shrink-0" />;
}
