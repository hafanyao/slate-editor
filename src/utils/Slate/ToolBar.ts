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
      // CustomEditor.toggleBlock(editor, tool.type);
      break;
    case 'italic':
      CustomEditor.toggleMark(editor, tool.type);
      break;
    case 'underline':
      CustomEditor.toggleMark(editor, tool.type);
      break;
    //   case 'ordered-list':
    //     ReactEditor.toggleBlockType(editorIns, 'ordered-list');
    //     break;
    //   case 'unordered-list':
    //     ReactEditor.toggleBlockType(editorIns, 'unordered-list');
    //     break;
    default:
      break;
  }
};
