import { Node } from 'slate'

export const CustomNode = {
  ...Node,
}

// 最重要的类型是Node对象：
//     —— Editor 包含整个文档内容的根节点。
//     —— Element 在您的领域中具有语义含义的容器节点。
//     —— Text 以及包含文档文本的叶子节点。

// const string = Node.string(element)

// const descendant = Node.get(value, path)

// 将光标向后移动三个单词
// Transforms.move(editor, {
//   distance: 3,
//   unit: 'word',
//   reverse: true,
// })