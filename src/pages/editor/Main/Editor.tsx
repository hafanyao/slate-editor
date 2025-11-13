import React, { useMemo, useEffect, useCallback } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  type RenderLeafProps,
} from 'slate-react';
import HeaderBar from './HeaderBar';
import { useOnKeyDown } from './KeyDown';
import { Leaf as LeafForm } from './LeafForm';
import { Element as CustomElement } from './Element';
import GlobalMenu from '../../../components/global/menu';
import { useGlobalStore, useEditorStore } from '../../../store';
import { clickToolIetm, CustomEditor } from '../../../utils/Slate';
import './Editor.css';

const EditorMain: React.FC = () => {
  const handleKeyDown = useOnKeyDown();

  const { menuPosition } = useGlobalStore();
  const { setEditorIns } = useEditorStore();
  // const [editor] = useState(() => withReact(withHistory(createEditor())));

  const editor = useMemo(() => {
    const Instance = withReact(withHistory(createEditor()));
    setEditorIns(Instance);
    return Instance;
  }, []);

  const initialValue = useMemo(
    () =>
      // JSON.parse(localStorage.getItem('content')) ||
      [
        {
          nodeType: 'element',
          type: 'dmodule',
          attributes: {},
          children: [
            {
              nodeType: 'element',
              type: 'identAndStatusSection',
              attributes: {},
              children: [
                {
                  nodeType: 'element',
                  type: 'dmAddress',
                  attributes: {},
                  children: [],
                },
              ],
            },
            {
              nodeType: 'element',
              type: 'content',
              attributes: {},
              children: [
                {
                  nodeType: 'element',
                  type: 'refs',
                  attributes: {},
                  children: [
                    {
                      nodeType: 'element',
                      type: 'pmRef',
                      attributes: {},
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    []
  );

  // 点击 toolBar
  const handleClickToolIetm = (item: any) => {
    clickToolIetm(item, editor);
  };

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafForm {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: React.ComponentProps<typeof CustomElement>) => (
      <CustomElement {...props} />
    ),
    []
  );

  useEffect(() => {
    CustomEditor.normalize(editor, { force: true });
  }, [editor]);

  return (
    <div className="h-full bg-white">
      <GlobalMenu width={256} top={menuPosition.top} left={menuPosition.left} />
      <Slate editor={editor} initialValue={initialValue}>
        <HeaderBar clickToolIetm={handleClickToolIetm} />
        <Editable
          className="p-5 outline-none"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={e => handleKeyDown({ event: e, editor })}
        />
      </Slate>
      {/* <img src="/demo.png" /> */}
    </div>
  );
};

export default EditorMain;
