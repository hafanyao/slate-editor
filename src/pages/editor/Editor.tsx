import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  type RenderLeafProps,
} from 'slate-react';
import { CustomEditor } from '../../utils/Slate/Editor';
import { onKeyDown } from '../editor/KeyDown';
import { Leaf as LeafForm } from './LeafForm';
import { Element as CustomElement } from '../editor/Element';
import './Editor.css';

const EditorApp: React.FC = () => {
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
    (props: any) => <CustomElement {...props} />,
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => onKeyDown({ event, editor }),
    [editor]
  );

  useEffect(() => {
    CustomEditor.normalize(editor, { force: true });
  }, [editor]);

  return (
    <div className="page-container">
      <h2>Slate编辑器</h2>
      <div className="editor-container">
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
            className="p-2 outline-none"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={handleKeyDown}
          />
        </Slate>
      </div>
      <img src="/demo.png" />
    </div>
  );
};

export default EditorApp;
