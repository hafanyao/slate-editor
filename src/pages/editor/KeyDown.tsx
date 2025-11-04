import { CustomEditor } from '../../utils/Slate/Editor';

export const onKeyDown = (props: any) => {
  const { event, editor } = props;
  switch (event.key) {
    case 'Enter':
      const rect = CustomEditor.getCursorPos(editor);
      console.log(rect, '=====');
  }
};
