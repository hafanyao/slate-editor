import { CustomEditor } from '../../utils/Slate/Editor';

export const onKeyDown = (props: any) => {
  const { event, editor } = props;
  console.log(event.key === 'Enter');
  switch (event.key) {
    case 'Enter':
      console.log('Enter');
      const rect = CustomEditor.getCursorPos(editor);
      console.log(rect, '=====');
  }
};
