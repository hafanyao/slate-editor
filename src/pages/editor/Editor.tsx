import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { createEditor } from 'slate';
import { Allotment } from 'allotment';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  type RenderLeafProps,
} from 'slate-react';
import { useGlobalStore } from '../../store';
import { useOnKeyDown } from '../editor/KeyDown';
import { Leaf as LeafForm } from './LeafForm';
import GlobalMenu from '../../components/global/menu';
import { CustomEditor } from '../../utils/slate/editor';
import { Element as CustomElement } from '../editor/Element';
import './Editor.css';
import 'allotment/dist/style.css';

const EditorApp: React.FC = () => {
  const handleKeyDown = useOnKeyDown();

  const { menuPosition } = useGlobalStore();
  const [editor] = useState(() => withReact(withHistory(createEditor())));

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
    <div className="h-full">
      <Allotment>
        <Allotment.Pane minSize={150} maxSize={300} preferredSize={200}>
          <div className="h-full p-4 bg-white border-r">
            <h3 className="text-sm font-semibold mb-2">左侧栏</h3>
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={400}>
          <div className="h-full bg-white">
            <GlobalMenu
              width={256}
              top={menuPosition.top}
              left={menuPosition.left}
            />
            <Slate
              editor={editor}
              initialValue={initialValue}
              onChange={value => {
                // const isAstChange = editor.operations.some(
                //   op => 'set_selection' !== op.type
                // )
                // if (isAstChange) {
                //   const content = JSON.stringify(value)
                //   localStorage.setItem('content', content)
                // }
              }}>
              <Editable
                className="p-5 outline-none"
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                onKeyDown={e => handleKeyDown({ event: e, editor })}
              />
            </Slate>
            <img src="/demo.png" />
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={150} maxSize={300} preferredSize={200}>
          <div className="h-full p-4 bg-white border-l">
            <h3 className="text-sm font-semibold mb-2">右侧栏</h3>
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default EditorApp;
