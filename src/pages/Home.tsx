import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        欢迎使用Slate编辑器
      </h2>
      <p className="text-red-500 mb-3">
        这是一个基于React和Slate的富文本编辑器应用。
      </p>
      <p className="text-gray-600">请从左侧菜单选择您想要访问的功能。</p>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">功能简介</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>富文本编辑</li>
          <li>格式设置</li>
          <li>内容管理</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
