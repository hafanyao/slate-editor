import type { RenderLeafProps } from 'slate-react';

export const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;
  let content = children;
  if ((leaf as any).bold) {
    content = <strong>{children}</strong>;
  }
  if ((leaf as any).code) {
    content = <code>{children}</code>;
  }
  if ((leaf as any).italic) {
    content = <em>{children}</em>;
  }
  if ((leaf as any).underline) {
    content = <u>{children}</u>;
  }
  return <span {...attributes}>{content}</span>;
};
