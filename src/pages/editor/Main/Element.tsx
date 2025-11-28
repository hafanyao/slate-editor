// import { XmlDom } from './demo/XmlDom';
import type { NodeItem } from '../types';
import { useEditorStore } from '@/store';

export const Element = (props: any) => {
  const { setCurNode } = useEditorStore();

  const { attributes, children, element } = props;

  const CodeElement = () => {
    return (
      <pre {...attributes}>
        <code>{children}</code>
      </pre>
    );
  };

  const ImageElement = () => {
    return (
      <div {...attributes}>
        <img src={element.attributes.src} />
      </div>
    );
  };

  const DefaultElement = () => {
    const handleClickNode = (e: Event) => {
      console.log(element);
      setCurNode(element);
      e.stopPropagation();
    };

    return (
      <div
        {...attributes}
        className="cursor-pointer"
        onClick={e => handleClickNode(e)}>
        <span className="dmodule-span right-arrow" contentEditable={false}>
          - {element.type}
        </span>
        <div className="min-h-6">{children}</div>
        <span className="dmodule-span left-arrow" contentEditable={false}>
          {element.type}
        </span>
      </div>
    );
  };

  switch (element.type) {
    case 'code':
      return <CodeElement {...props} />;
    case 'image':
      return <ImageElement {...props} />;
    default:
      return <DefaultElement {...props} />;
    // case 'block-quote':
    //   return (
    //     <blockquote style={style} {...attributes}>
    //       {children}
    //     </blockquote>
    //   );
    // case 'bulleted-list':
    //   return (
    //     <ul style={style} {...attributes}>
    //       {children}
    //     </ul>
    //   );
    // case 'heading-one':
    //   return (
    //     <h1 style={style} {...attributes}>
    //       {children}
    //     </h1>
    //   );
    // case 'heading-two':
    //   return (
    //     <h2 style={style} {...attributes}>
    //       {children}
    //     </h2>
    //   );
    // case 'list-item':
    //   return (
    //     <li style={style} {...attributes}>
    //       {children}
    //     </li>
    //   );
    // case 'numbered-list':
    //   return (
    //     <ol style={style} {...attributes}>
    //       {children}
    //     </ol>
    //   );
    // case 'paragraph':
    //   return (
    //     <p style={style} {...attributes}>
    //       {children}
    //     </p>
    //   );
  }
};
