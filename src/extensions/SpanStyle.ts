import { Mark, mergeAttributes } from "@tiptap/core";

export type SpanStyleSize = "small" | "normal" | "large";
export type SpanStyleTransform = "uppercase" | "lowercase" | "none";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    spanStyle: {
      setSpanStyle: (attrs: { size?: SpanStyleSize; transform?: SpanStyleTransform }) => ReturnType;
      unsetSpanStyle: () => ReturnType;
    };
  }
}

export const SpanStyle = Mark.create({
  name: "spanStyle",

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute("data-size") || null,
        renderHTML: (attrs) => (attrs.size ? { "data-size": attrs.size } : {}),
      },
      transform: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).getAttribute("data-transform") || null,
        renderHTML: (attrs) => (attrs.transform ? { "data-transform": attrs.transform } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-size], span[data-transform]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setSpanStyle:
        (attrs) =>
        ({ commands }) =>
          commands.setMark(this.name, attrs),
      unsetSpanStyle:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    };
  },
});
