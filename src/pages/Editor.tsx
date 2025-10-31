import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Element, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  },
}

const EditorApp: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [
            { text: 'A line of text in a paragraph.' },
            { 
              type: 'link',
              url: 'https://example.com',
              text: 'link',
              bold: true,
            }
          ],
        },
      ],
    []
  )

  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }
  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const Leaf = props => {
    const fontWeight = props.leaf.bold ? 'bold' : 'normal'
    console.log(fontWeight);
    return (
      <span
        {...props.attributes}
        style={{ fontWeight }}
      >
        {props.children}
      </span>
    )
  }

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // 如果正在输入文本，不触发上下文菜单
        if (ReactEditor.isComposing(editor)) {
          return;
        }
        e.preventDefault();
        // 计算上下文菜单位置
        const { selection } = editor;
        if (!selection) return;
        // 根据当前光标位置计算上下文菜单位置
        const { anchor } = selection;
        const range = Editor.range(editor, anchor.path, anchor.path);
        const nativeRange = ReactEditor.toDOMRange(editor, range);
        const rect = nativeRange.getBoundingClientRect();
        console.log(rect);
      }
    },
    [editor],
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
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            // onKeyDown={handleKeyDown}
            onKeyDown={event => {
              if (!event.ctrlKey) return
              switch (event.key) {
                case '`': {
                  event.preventDefault()
                  CustomEditor.toggleCodeBlock(editor)
                  break
                }
                case 'b': {
                  event.preventDefault()
                  CustomEditor.toggleBoldMark(editor)
                  break
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