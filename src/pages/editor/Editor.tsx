import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
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
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = useMemo(
    () =>
      // JSON.parse(localStorage.getItem('content')) ||
      [
        {
          type: 'dmodule',
          nodeType: 'element',
          attributes: {},
          children: [
            {
              nodeType: 'element',
              type: 'identAndStatusSection',
              attributes: {},
              children: [],
            },
            {
              nodeType: 'element',
              type: 'content',
              attributes: {},
              children: [
                {
                  nodeType: 'element',
                  type: 'image',
                  attributes: {
                    src: '/public/vite.svg',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            { text: 'A line of text in a paragraph.' },
            {
              type: 'link',
              url: 'https://example.com',
              text: 'link',
              bold: true,
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
    </div>
  );
};

export default EditorApp;
