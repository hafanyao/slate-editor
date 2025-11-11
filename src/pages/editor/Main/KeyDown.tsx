import { Editor } from 'slate';
import { type KeyboardEvent } from 'react';
import { useGlobalStore } from '../../../store';
import { CustomEditor } from '../../../utils/slate/editor';

// 将 onKeyDown 转换为自定义 Hook
// 这样就可以在内部使用 useGlobalStore
// 使用时: const handleKeyDown = useOnKeyDown();
export const useOnKeyDown = () => {
  const { setMenuPosition } = useGlobalStore();
  const handleKeyDown = (props: { event: KeyboardEvent; editor: Editor }) => {
    const { event, editor } = props;
    switch (event.key) {
      case 'Enter': {
        const rect = CustomEditor.getCursorPos(editor) as {
          top: number;
          left: number;
        };
        setMenuPosition({
          top: rect.top + 23,
          left: rect.left + 100,
        });
        event.preventDefault();
        break;
      }
    }
  };

  return handleKeyDown;
};
