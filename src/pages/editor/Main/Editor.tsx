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
import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useGlobalStore, useEditorStore } from '../../../store';
// import HeaderBar from './HeaderBar';
import { useOnKeyDown } from './KeyDown';
import { Leaf as LeafForm } from './LeafForm';
import { Element as CustomElement } from './Element';
import GlobalMenu from '../../../components/global/menu';
import { CustomEditor } from '../../../utils/slate/Editor';
import './Editor.css';

const tools = [
  {
    type: 'bold',
    label: '加粗',
    icon: <BoldOutlined />,
  },
  {
    type: 'italic',
    label: '斜体',
    icon: <ItalicOutlined />,
  },
  {
    type: 'underline',
    label: '下划线',
    icon: <UnderlineOutlined />,
  },
  // 有序列表
  {
    type: 'ordered-list',
    label: '有序列表',
    icon: <OrderedListOutlined />,
  },
  // 无序列表
  {
    type: 'unordered-list',
    label: '无序列表',
    icon: <UnorderedListOutlined />,
  },
];

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

  const handleClick = (tool: any) => {
    console.log(tool);
    switch (tool.type) {
      case 'bold':
        CustomEditor.toggleBoldMark(editor);
        break;
      //   case 'italic':
      //     ReactEditor.toggleMark(editorIns, 'italic');
      //     break;
      //   case 'underline':
      //     ReactEditor.toggleMark(editorIns, 'underline');
      //     break;
      //   case 'ordered-list':
      //     ReactEditor.toggleBlockType(editorIns, 'ordered-list');
      //     break;
      //   case 'unordered-list':
      //     ReactEditor.toggleBlockType(editorIns, 'unordered-list');
      //     break;
      default:
        break;
    }
  };

  return (
    <div className="h-full bg-white">
      {/* <HeaderBar /> */}
      <GlobalMenu width={256} top={menuPosition.top} left={menuPosition.left} />
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
        <header className="p-2 flex items-center justify-start bg-red-100">
          {tools.map(tool => (
            <div
              key={tool.label}
              className="mr-2 cursor-pointer flex items-center"
              onClick={() => handleClick(tool)}
              onPointerDown={(event: any) => event.preventDefault()}>
              {tool.icon}
            </div>
          ))}
        </header>
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
