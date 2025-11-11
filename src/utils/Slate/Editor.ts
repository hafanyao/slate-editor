import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const CustomEditor = {
  ...Editor,
  insertImage(editor: Editor, url) {
    const element = { type: 'image', url, children: [{ text: '' }] };
    Transforms.insertNodes(editor, element);
  },
  insertParagraph(editor: Editor, text: string = '') {
    // 插入一个空段落
    Transforms.insertNodes(editor, {
      type: 'paragraph',
      children: [{ text }],
    });
  },
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    });
    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },

  getCursorPos(editor: Editor) {
    // 如果正在输入文本，不触发上下文菜单
    if (ReactEditor.isComposing(editor)) {
      console.log('!isComposing');
      return null;
    }
    // 计算上下文菜单位置
    const { selection } = editor;
    if (!selection) {
      console.log('!selection');
      return null;
    }
    // 根据当前光标位置计算上下文菜单位置
    const { anchor } = selection;
    const range = Editor.range(editor, anchor.path, anchor.path);
    const nativeRange = ReactEditor.toDOMRange(editor, range);
    const rect = nativeRange.getBoundingClientRect();
    return rect;
  },
};

// 追加内容：editor.insertText('and')

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
