import { Editor, Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import {
  type CustomEditor as CustomEditorType,
  type CustomElementType,
} from '../../types/custom-types';

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;

type ListType = (typeof LIST_TYPES)[number];
type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
type CustomElementFormat = CustomElementType | AlignType | ListType;

const isAlignElement = (element: any): element is any => {
  return 'align' in element;
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as any;
  return marks ? marks[format] === true : false;
};

const isListType = (format: string): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

const isAlignType = (format: string): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

const isBlockActive = (
  editor: CustomEditorType,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => {
        if (!Editor.isEditor(n) && Element.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    })
  );

  return !!match;
};

export const CustomEditor = {
  ...Editor,
  // 插入图片
  insertImage(editor: Editor, url: string) {
    const element = { type: 'image', url, children: [{ text: '' }] };
    Transforms.insertNodes(editor, element);
  },
  // 加粗、斜体、下划线
  toggleMark(editor: Editor, format: string) {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  // 插入段落
  insertParagraph(editor: Editor, text: string = '') {
    Transforms.insertNodes(editor, {
      type: 'paragraph',
      children: [{ text }],
    });
  },
  // 是否加粗
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  // 切换加粗
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },
  // 标题、有序列表、无序列表
  toggleBlock(editor: Editor, format: CustomElementFormat) {
    console.log(format);
    const isActive = isBlockActive(
      editor,
      format,
      isAlignType(format) ? 'align' : 'type'
    );
    const isList = isListType(format);

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        isListType(n.type) &&
        !isAlignType(format),
      split: true,
    });
    let newProperties: Partial<Element>;
    if (isAlignType(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      };
    }
    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
  // 获取当前鼠标位置
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

// const editor = useSlate();
// 追加内容：editor.insertText('and')

// Slate 编辑器的顶级 Editor 对象
// interface Editor {
//   Current editor state
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
//   Overrideable core actions.
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
