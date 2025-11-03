import { Editor, Transforms } from 'slate';

export const CustomEditor = {
  ...Editor,
  insertImage(editor, url) {
    const element = { type: 'image', url, children: [{ text: '' }] };
    Transforms.insertNodes(editor, element);
  },
  insertParagraph(editor: any, text: string = '') {
    // 插入一个空段落
    Transforms.insertNodes(editor, {
      type: 'paragraph',
      children: [{ text }],
    });
  },
};

// Slate 编辑器的顶级 Editor 对象
// interface Editor {
//   // Current editor state
//   children: Node[]
//   selection: Range | null
//   operations: Operation[]
//   marks: Omit<Text, 'text'> | null
//   // Schema-specific node behaviors.
//   isInline: (element: Element) => boolean
//   isVoid: (element: Element) => boolean
//   markableVoid: (element: Element) => boolean
//   normalizeNode: (entry: NodeEntry) => void
//   onChange: (options?: { operation?: Operation }) => void
//   // Overrideable core actions.
//   addMark: (key: string, value: any) => void
//   apply: (operation: Operation) => void
//   deleteBackward: (unit: 'character' | 'word' | 'line' | 'block') => void
//   deleteForward: (unit: 'character' | 'word' | 'line' | 'block') => void
//   deleteFragment: () => void
//   insertBreak: () => void
//   insertSoftBreak: () => void
//   insertFragment: (fragment: Node[]) => void
//   insertNode: (node: Node) => void
//   insertText: (text: string) => void
//   removeMark: (key: string) => void
// }
