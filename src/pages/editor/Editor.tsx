import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Element, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { CustomEditor } from '../../utils/Slate/Editor';
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
              children: [],
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

  const Leaf = props => {
    const fontWeight = props.leaf.bold ? 'bold' : 'normal';
    console.log(fontWeight);
    return (
      <span {...props.attributes} style={{ fontWeight }}>
        {props.children}
      </span>
    );
  };

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  // const renderElementFn = useCallback(
  //   (props: any) => <renderElement {...props} />,
  //   []
  // );

  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const DModuleElement = props => {
    console.log(props);
    return (
      <div {...props.attributes}>
        <span className="dmodule-span right-arrow">sss</span>
        <div className="min-h-10"></div>
        <span className="dmodule-span left-arrow">sss</span>
      </div>
    );
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'dmodule':
        return <DModuleElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

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
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            // onKeyDown={handleKeyDown}
            onKeyDown={event => {
              if (!event.ctrlKey) return;
              switch (event.key) {
                case '`': {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                  break;
                }
                case 'b': {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;
                }
                case 'Enter': {
                  event.preventDefault();
                  CustomEditor.getCursorPos(editor);
                  break;
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  );
};

// 追加内容：editor.insertText('and')
// 选择全部内容：Transforms.select(editor, [])

export default EditorApp;
