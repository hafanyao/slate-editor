import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createEditor } from 'slate';
import { Button, message } from 'antd';
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

  const [curNode, setCurNode] = useState(null);

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
          id: uuidv4(),
          nodeType: 'element',
          type: 'dmodule',
          attributes: {},
          children: [
            {
              id: uuidv4(),
              nodeType: 'element',
              type: 'identAndStatusSection',
              attributes: {},
              children: [
                {
                  id: uuidv4(),
                  nodeType: 'element',
                  type: 'dmAddress',
                  attributes: {},
                  children: [],
                },
              ],
            },
            {
              id: uuidv4(),
              nodeType: 'element',
              type: 'content',
              attributes: {},
              children: [
                {
                  id: uuidv4(),
                  nodeType: 'element',
                  type: 'refs',
                  attributes: {},
                  children: [
                    {
                      id: uuidv4(),
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

  const handleCreateNode = (props: { type: string }) => {
    const { type } = props;
    console.log(type);
    switch (type) {
      case 'getNode': {
        // 获取 slate 编辑器当前 Node
        const [node, path] = CustomEditor.node(editor, [0]);
        console.log('当前 Node:', node, path);
        break;
      }
      case 'getPath': {
        // 获取 slate 编辑器当前 Path
        if (!curNode) return message.warning('先获取节点');
        const path = ReactEditor.findPath(editor, curNode);
        console.log('当前 Path:', path);
        break;
      }
    }
  };

  // const path = ReactEditor.findPath(editor, curNode);
  // Transforms.setNodes(
  //   editor,
  //   {
  //     ...curNode,
  //     attributes: {
  //       ...curNode.attributes,
  //       [key]: value,
  //     },
  //   },
  //   {
  //     at: path,
  //   },
  // );

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
        <div className="px-5">
          <Button onClick={() => handleCreateNode({ type: 'getNode' })}>
            getNode
          </Button>
          <Button onClick={() => handleCreateNode({ type: 'getPath' })}>
            getPath
          </Button>
        </div>
      </Slate>
      {/* <img src="/demo.png" /> */}
    </div>
  );
};

export default EditorMain;
