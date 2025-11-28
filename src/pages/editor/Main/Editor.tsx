import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createEditor, Editor, Transforms, type Node } from 'slate';
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
  const { curNode, curPath, setEditorIns, setCurPath } = useEditorStore();

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

  const handleNode = (props: { type: string }) => {
    const { type } = props;
    switch (type) {
      case 'getPath': {
        // 获取 slate 编辑器当前 Path
        if (!curNode) return message.warning('先获取节点');
        const path = ReactEditor.findPath(editor, curNode);
        setCurPath(path);
        console.log('当前 Path:', path);
        break;
      }
      case 'addNode': {
        // 添加 slate 编辑器当前 Node
        if (!curPath) return message.warning('先获取路径');
        Transforms.insertNodes(
          editor,
          {
            id: uuidv4(),
            nodeType: 'element',
            type: 'code-line',
            attributes: {},
            children: [],
          },
          { at: curPath }
        );
        break;
      }
      case 'getNode': {
        // 获取 slate 编辑器当前 Node
        const [node, path] = CustomEditor.node(editor, curPath);
        console.log('当前 Node:', node);
        break;
      }
      case 'delNode': {
        // 删除 slate 编辑器当前 Node
        if (!curPath) return message.warning('先获取路径');
        Transforms.removeNodes(editor, { at: curPath });
        break;
      }
      case 'delText': {
        // 删除 slate 编辑器当前 Text
        if (editor.selection) {
          Editor.deleteFragment(editor);
        }
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
        <div className="px-5 flex gap-2">
          <Button onClick={() => handleNode({ type: 'getPath' })}>
            getPath
          </Button>
          <Button onClick={() => handleNode({ type: 'getNode' })}>
            getNode
          </Button>
          <Button onClick={() => handleNode({ type: 'addNode' })}>
            addNode
          </Button>
          <Button onClick={() => handleNode({ type: 'delNode' })}>
            delNode
          </Button>
          <Button onClick={() => handleNode({ type: 'delText' })}>
            delText
          </Button>
        </div>
      </Slate>
      {/* <img src="/demo.png" /> */}
    </div>
  );
};

export default EditorMain;
