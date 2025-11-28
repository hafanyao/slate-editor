import { create } from 'zustand';
import type { Editor } from 'slate';
import type { NodeItem } from '../types';

export const useEditorStore = create<{
  editorIns: Editor | null;
  setEditorIns: (editor: Editor) => void;
  curNode: NodeItem | null;
  setCurNode: (node: NodeItem) => void;
  curPath: number[] | null;
  setCurPath: (path: number[]) => void;
}>(set => ({
  editorIns: null,
  setEditorIns: editor => set({ editorIns: editor }),
  curNode: null,
  setCurNode: node => set({ curNode: node }),
  curPath: null,
  setCurPath: path => set({ curPath: path }),
}));
