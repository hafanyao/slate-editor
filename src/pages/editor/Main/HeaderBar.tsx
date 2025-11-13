import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

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

const HeaderBar: React.FC = ({ clickToolIetm }) => {
  return (
    <div className="p-2 flex items-center justify-start bg-red-100">
      {tools.map(tool => (
        <div
          key={tool.label}
          className="mr-2 cursor-pointer flex items-center"
          onClick={() => clickToolIetm(tool)}
          onPointerDown={(event: any) => event.preventDefault()}>
          {tool.icon}
        </div>
      ))}
    </div>
  );
};

export default HeaderBar;
