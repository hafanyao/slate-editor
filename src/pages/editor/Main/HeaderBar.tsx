import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useEditorStore } from '../../../store';
import { ReactEditor } from 'slate-react';
import { CustomEditor } from '../../../utils';

interface Tool {
  type: string;
  label: string;
  icon: React.ReactNode;
}

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

const HeaderBar: React.FC = () => {
  const { editorIns } = useEditorStore();

  const handleClick = (tool: Tool) => {
    console.log(tool);
    switch (tool.type) {
      case 'bold':
        CustomEditor.toggleBoldMark(editorIns);
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
    <div className="p-2 flex items-center justify-start bg-red-100">
      {tools.map(tool => (
        <div
          key={tool.label}
          className="mr-2 cursor-pointer flex items-center"
          onClick={() => handleClick(tool)}>
          {tool.icon}
        </div>
      ))}
    </div>
  );
};

export default HeaderBar;
