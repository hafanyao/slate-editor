import { CustomEditor } from './Editor';

export const clickToolIetm = (tool, editor) => {
  switch (tool.type) {
    case 'bold':
      CustomEditor.toggleBoldMark(editor);
      break;
    //   case 'italic':
    //     ReactEditor.toggleMark(editorIns, 'italic');
    //     break;
    //   case 'underline':
    //     ReactEditor.toggleMark(editorIns, 'underline');
    //     break;
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
