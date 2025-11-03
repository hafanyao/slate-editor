import { Range } from 'slate';

export const CustomRange = {
  ...Range,
};

// const [start, end] = Range.edges(range)

// if (Range.isCollapsed(range)) {
//   // ...
// }

// 找到包含当前所选所有内容的最低区块
// function getCommonBlock(editor) {
//   const range = Editor.unhangRange(editor, editor.selection, { voids: true })

//   let [common, path] = SlateNode.common(
//     editor,
//     range.anchor.path,
//     range.focus.path
//   )

//   if (Editor.isBlock(editor, common) || Editor.isEditor(common)) {
//     return [common, path]
//   } else {
//     return Editor.above(editor, {
//       at: path,
//       match: n => Editor.isBlock(editor, n) || Editor.isEditor(n),
//     })
//   }
// }
