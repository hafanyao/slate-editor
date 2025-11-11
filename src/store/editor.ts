import { create } from 'zustand';
import type { Editor } from 'slate';

export const useEditorStore = create<{
  editorIns: Editor | null;
  setEditorIns: (editor: Editor) => void;
}>(set => ({
  editorIns: null,
  setEditorIns: editor => set({ editorIns: editor }),
}));
