import type { RenderLeafProps } from 'slate-react';

export const Leaf = (props: RenderLeafProps) => {
  const leaf = props.leaf as any;
  const { attributes, children } = props;
  let content = children;
  if (leaf.underline) {
    content = <u>{children}</u>;
  }
  if (leaf.italic) {
    content = <em>{children}</em>;
  }
  if (leaf.code) {
    content = <code>{children}</code>;
  }
  if (leaf.bold) {
    content = <strong>{children}</strong>;
  }
  return <span {...attributes}>{content}</span>;
};
