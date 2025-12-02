import type React from 'react';
import type { Editor } from 'slate';
import { CustomEditor } from './Editor';

interface Tool {
  type: string;
  label: string;
  icon: React.ReactNode;
}

export const clickToolIetm = (tool: Tool, editor: Editor) => {
  switch (tool.type) {
    case 'bold':
      CustomEditor.toggleBoldMark(editor);
      break;
    case 'italic':
      CustomEditor.toggleMark(editor, tool.type);
      break;
    case 'underline':
      CustomEditor.toggleMark(editor, tool.type);
      break;
    case 'numbered-list':
      CustomEditor.toggleBlock(editor, tool.type);
      break;
    case 'bulleted-list':
      CustomEditor.toggleBlock(editor, tool.type);
      break;
    default:
      break;
  }
};
